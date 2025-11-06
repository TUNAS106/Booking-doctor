import patientService from "../services/patientService.js";
let postBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookAppointment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log("Error in postBookAppointment:", e);
        return res.status(500).json({ error: "An error occurred while booking the appointment." });
    }
}

export default {
    postBookAppointment
};