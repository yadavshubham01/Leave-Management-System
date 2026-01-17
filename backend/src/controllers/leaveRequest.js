import { LeaveRequest } from "../models/leaveRequest.js";
import { User } from "../models/user.model.js";

export const applyLeave = async(req,res) => {
    try{
        const { leaveType, startDate, endDate, reason } =req.body;
        
        if(!leaveType || !startDate || !endDate){
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if(start > end){
            return res.status(400).json({ message: "Start date cannot be after end date" });
        }

        const leaveDays = Math.floor((end-start)/(1000*60*60*24))+1;
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(400).json({
                message:"User not Found"
            });
        }

        if(user.leaveBalance[leaveType] < leaveDays){
            return res.status(400).json({
                message: "Insufficient leave balance"
            });
        }

        const leaveRequest = await LeaveRequest.create({
            employee:user._id,
            leaveType,
            startDate,
            endDate,
            reason
        });
        return res.status(201).json({
           message:"Insufficient leave balance",
           leaveRequest
        });
    }catch(error){
        console.error("Apply Leave Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

export const getPendingLeaves = async(req,res) => {
    try{
      
       const leaves = await LeaveRequest.find({status:"Pending"})
        .populate("employee","firstName lastName email role")
        .sort({createdAt:-1});

        return res.status(200).json({
            count: leaves.length,
            leaves
        })
    }catch(error){
       console.error("Get Pending Leaves Error:", error);
       return res.status(500).json({ message: "Internal server error" });
    }
}

export const approvedLeave = async(req,res) => {
    try{
        const leave = await LeaveRequest.findById(req.params.id);

        if(!leave || leave.status !== "Pending"){
            return res.status(400).json({ message: "Invalid leave request" });
        }

        const user = await User.findById(leave.employee);

        const days = Math.floor((new Date(leave.endDate) - new Date(leave.startDate))/(1000*60*60*24))+1;
        
         if (user.leaveBalance[leave.leaveType] < days) {
           return res.status(400).json({ message: "Insufficient leave balance" });
         }
        
         user.leaveBalance[leave.leaveType] -=days;
         await user.save();
         leave.status = "Approved";
         leave.managerComment = req.body.comment || "";
         await leave.save();

         return res.status(200).json({
            message:"Leave approved Successfully",
            leave
         })

    }catch(error){
         console.error("Approve Leave Error: ", error);
       return res.status(500).json({ message: "Internal server error" });
    }
}


export const rejectLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);

    if (!leave || leave.status !== "Pending") {
      return res.status(400).json({ message: "Invalid leave request" });
    }

    leave.status = "Rejected";
    leave.managerComment = req.body.comment || "";
    await leave.save();

    return res.status(200).json({
      message: "Leave rejected",
      leave
    });
  } catch (error) {
    console.error("Reject Leave Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const leaveCalendar = async(req,res) => {
    try{
        const leaves = await LeaveRequest.find({status:"Approved"})
         .populate("employee",'firstName lastName email')
         .select("startDate endDate leaveType employee");

        const calendarData = leaves.map(leave => ({
            employeeName: `${leave.employee.firstName} ${leave.employee.lastName}`,
            leaveType: leave.leaveType,
            startDate: leave.startDate,
            endDate:leave.endDate
        }));

        return res.status(200).json(calendarData);
    }catch(error){
         console.error("Calendar Error:", error);
    return res.status(500).json({ message: "Internal server error" });
    }
}


export const getMyLeaves = async(req,res) => {
    try{
        const leaves = await LeaveRequest.find({
            employee:req.user.userId
        }).sort({createdAt:-1});

        res.status(200).json(leaves);
    }catch(error){
       console.error("Get My Leaves Error:", error);
       res.status(500).json({ message: "Internal server error" });
    }
}

export const updateLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);

  if (!leave || leave.status !== "Pending") {
    return res.status(400).json({ message: "Leave cannot be edited" });
  }

  if (leave.employee.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  leave.startDate = req.body.startDate;
  leave.endDate = req.body.endDate;
  leave.reason = req.body.reason;

  await leave.save();
  res.json({ message: "Leave updated", leave });
};

export const revokeLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);

  if (!leave || leave.status !== "Pending") {
    return res.status(400).json({ message: "Leave cannot be revoked" });
  }

  if (leave.employee.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await leave.deleteOne();
  res.json({ message: "Leave revoked" });
};

