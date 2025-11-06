import db from "../models/index.js";

let postBookAppointment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                });
            }

            // Create user if not exists
            let [user, created] = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    //firstName: data.fullName,
                    //address: data.address,
                    //gender: data.gender,
                    //phoneNumber: data.phoneNumber,
                    email: data.email,
                    roleId: 'R3'
                }
            });

            if (user) {
                await db.Booking.findOrCreate({
                    where: {
                        patientId: user.id,
                        doctorId: data.doctorId,
                    },
                    defaults: {
                        statusId: 'S1',
                        email: user.email,
                        date: data.date,
                        timeType: data.timeType,
                        doctorId: data.doctorId,
                        patientId: user.id,
                        gender: data.gender,

                    }
                });
            }

            // Simulate booking logic (e.g., save appointment in DB)
            console.log("Booking appointment with data:", data);

            // Here you would create appointment record, send email, etc.
            // For now return success with user info
            return resolve({
                errCode: 0,
                errMessage: "Booking successful",

            });
        } catch (e) {
            console.log("Error in postBookAppointment:", e);
            return reject(e);
        }
    });
}

export default {
    postBookAppointment
};