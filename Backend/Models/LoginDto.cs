using System;

namespace Backend.Models;

public class LoginDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public UserRole Role { get; set; }
}
