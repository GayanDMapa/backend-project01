//Standardized response funtion

import { createTaskService, deleteTaskService, getAllTasksService, getTaskByIdService, updateTaskService } from "../model/tasksModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createUser = async(req, res, next) => {
    const {user_id, title, description} = req.body;
    try{
        const newTask = await createTaskService(user_id,title, description);
        handleResponse(res, 201, "Task created successfully",newTask)
    }catch(err){
        next(err);
    }
};

export const getAllTasks = async(req, res, next) => {
    try{
        const tasks = await getAllTasksService();
        handleResponse(res, 200, "Task fetched successfully",tasks)
    }catch(err){
        next(err);
    }
};

export const getTaskById = async(req, res, next) => {
    try{
        const task = await getTaskByIdService(req.params.id);
        if(!task) return handleResponse(res, 404, "Task not found")
        handleResponse(res, 201, "Task fetched successfully",task)
    }catch(err){
        next(err);
    }
};

export const updateTask = async (req, res, next) => {
    const { title, description, is_completed } = req.body; // Extract the task details from the body
    const taskId = req.params.id; // Extract task id from route params

    try {
        const updatedTask = await updateTaskService(taskId, title, description, is_completed); // Pass the data to the service
        if (!updatedTask) {return handleResponse(res, 404, "Task not found");}
        handleResponse(res, 200, "Task updated successfully", updatedTask); // Send the updated task back
    } catch (err) {
        next(err); // Pass error to next middleware
    }
};


export const deleteTask = async(req, res, next) => {
    try{
        const deletedTask = await deleteTaskService(req.params.id);
        if(!deletedTask) return handleResponse(res, 404, "Task not found")
        handleResponse(res, 201, "Task deleted successfully",deletedTask)
    }catch(err){
        next(err);
    }
};



