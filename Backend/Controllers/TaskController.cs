using Backend.Models;
using Backend.Services;
using Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController(TaskService taskService) : ControllerBase
    {
        private readonly TaskService _taskService=taskService;

        // [Authorize]
        // [HttpGet]
        // public async Task<ActionResult<List<TaskItem>>> GetAll()
        // {
        //     try
        //     {
        //         var todos = await _taskService.GetAll();
        //         return Ok(new ApiResponse<List<TaskItem>>
        //         {
        //             Success = todos != null,
        //             Message = todos != null ? "Todos fetched" : "Todos not found",
        //             Data = todos
        //         });
        //     }
        //     catch (System.Exception e)
        //     {

        //         return BadRequest(new ApiResponse<List<TaskItem>>
        //         {
        //             Success = false,
        //             Message = e.Message
        //         });
        //     }

        // }
        [Authorize]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]        
        public async Task<ActionResult<PaginatedResponse<TaskItem>>> GetFilteredPaginated(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? status = null)
        {
            try
            {
                var filteredData = await _taskService.GetFilteredPaginated(page, pageSize, search, status);
                var totalCount = await _taskService.GetFilteredCount(search, status);

                return Ok(new PaginatedResponse<TaskItem>
                {
                    Success = true,
                    Message = "Tasks fetched with filters and pagination",
                    Data = filteredData,
                    CurrentPage = page,
                    PageSize = pageSize,
                    TotalCount = totalCount
                });
            }
            catch (Exception e)
            {
                return BadRequest(new PaginatedResponse<TaskItem>
                {
                    Success = false,
                    Message = e.Message,
                    Data = [],
                    CurrentPage = page,
                    PageSize = pageSize,
                    TotalCount = 0
                });
            }
        }


        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TaskItem>> GetById(string id)
        {
            try
            {
                var TaskItem = await _taskService.GetById(id);
                return Ok(new ApiResponse<TaskItem>
                {
                    Success = TaskItem != null,
                    Message = TaskItem != null ? "TaskItem fetched" : "TaskItem not found",
                    Data = TaskItem
                });
            }
            catch (Exception e)
            {
                return BadRequest(new ApiResponse<TaskItem>
                {
                    Success = false,
                    Message = e.Message
                });
            }
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TaskItem>> Add(TaskItem TaskItem)
        {
            try
            {
                await _taskService.Add(TaskItem);
                return Ok(new ApiResponse<TaskItem>
                {
                    Success = true,
                    Message = "TaskItem added",
                    Data = TaskItem
                });
            }
            catch (System.Exception e)
            {
                return BadRequest(new ApiResponse<TaskItem>
                {
                    Success = false,
                    Message = e.Message
                });
            }

        }

        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(string id, TaskItem TaskItem)
        {
            try
            {
                await _taskService.Update(id, TaskItem);
                return Ok(new ApiResponse<TaskItem>
                {
                    Success = true,
                    Message = "TaskItem updated",
                    Data = TaskItem
                });
            }
            catch (System.Exception e)
            {
                return BadRequest(new ApiResponse<TaskItem>
                {
                    Success = false,
                    Message = e.Message
                });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                await _taskService.Delete(id);
                return Ok(new ApiResponse<TaskItem>
                {
                    Success = true,
                    Message = "TaskItem deleted"
                });
            }
            catch (System.Exception e)
            {
                return BadRequest(new ApiResponse<TaskItem>
                {
                    Success = false,
                    Message = e.Message
                });
            }
        }

    }
}
