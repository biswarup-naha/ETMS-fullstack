using System;
using Backend.Models;
using MongoDB.Driver;

namespace Backend.Services;

public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(DatabaseSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);
        _users = database.GetCollection<User>(settings.UserCollectionName);
    }

    // public async Task<List<User>> GetAll() => await _users.Find(user => true).ToListAsync();

    public async Task<List<User>> GetAll(int page = 1, int pageSize = 10, string? search = null, string? role = null)
    {
        var filterBuilder = Builders<User>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrEmpty(search))
        {
            var searchFilter = filterBuilder.Or(
                filterBuilder.Regex(u => u.FullName, new MongoDB.Bson.BsonRegularExpression(search, "i")),
                filterBuilder.Regex(u => u.Email, new MongoDB.Bson.BsonRegularExpression(search, "i"))
            );
            filter &= searchFilter;
        }

        // if (!string.IsNullOrEmpty(role))
        // {
        //     filter &= filterBuilder.Eq(u => u.Role, role);
        // }

        return await _users.Find(filter)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();
    }

    public async Task<long> GetTotal(int page = 1, int pageSize = 10, string? search = null, string? role = null)
    {
        var filterBuilder = Builders<User>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrEmpty(search))
        {
            var searchFilter = filterBuilder.Or(
                filterBuilder.Regex(u => u.FullName, new MongoDB.Bson.BsonRegularExpression(search, "i")),
                filterBuilder.Regex(u => u.Email, new MongoDB.Bson.BsonRegularExpression(search, "i"))
            );
            filter &= searchFilter;
        }

        return await _users.CountDocumentsAsync(filter);
    }

    public async Task<User> GetById(string id) => await _users.Find(user => user.Id == id).FirstOrDefaultAsync();

    public async Task Add(User user)
    {
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(10));

        await _users.InsertOneAsync(user);
    }

    public async Task Update(string id, User updatedUser){
        var filter=Builders<User>.Filter.Eq(p=>p.Id,id);
        var update = Builders<User>.Update
       .Set(u => u.FullName, updatedUser.FullName)
       .Set(u => u.Email, updatedUser.Email)
       .Set(u => u.Role, updatedUser.Role)
       .Set(u => u.IsActive, updatedUser.IsActive)
       .Set(u => u.UpdatedAt, DateTime.UtcNow);

        // Only update password if it's not null or whitespace
        if (!string.IsNullOrWhiteSpace(updatedUser.Password))
        {
            updatedUser.HashPassword();
            update = update.Set(u => u.Password, updatedUser.Password);
        }

        await _users.UpdateOneAsync(filter, update);
    }

    public async Task Delete(string id) =>
        await _users.DeleteOneAsync(user => user.Id == id);

    public async Task<User> GetByEmail(string email) =>
        await _users.Find(user => user.Email == email).FirstOrDefaultAsync();

    public bool CheckPassword(User user, string password) =>
        BCrypt.Net.BCrypt.Verify(password, user.Password);

}
