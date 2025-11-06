import db from "../models/index.js";
import _ from "lodash";

let getTopDoctorHome = async (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [["createdAt", "DESC"]],
                attributes: { exclude: ["password"] },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: true,
                nest: true,
            });
            resolve({ errCode: 0, data: users });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ["password", "image"] }
            });
            resolve({ errCode: 0, data: doctors });
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.description
                || !inputData.selectedPrice || !inputData.selectedPayment || !inputData.selectedProvince || !inputData.nameClinic || !inputData.addressClinic
            ) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }

            await db.Markdown.create({
                contentHTML: inputData.contentHTML,
                contentMarkdown: inputData.contentMarkdown,
                description: inputData.description,
                doctorId: inputData.doctorId,

            });

            let doctorInfor = await db.Doctor_Infor.findOne({
                where: {
                    doctorId: inputData.doctorId
                },
                raw: false,
            });

            if (doctorInfor) {
                // update
                doctorInfor.priceId = inputData.selectedPrice;
                doctorInfor.provinceId = inputData.selectedProvince;
                doctorInfor.paymentId = inputData.selectedPayment;
                doctorInfor.nameClinic = inputData.nameClinic;
                doctorInfor.addressClinic = inputData.addressClinic;
                doctorInfor.note = inputData.note;
                await doctorInfor.save();
            } else {
                // create
                await db.Doctor_Infor.create({
                    doctorId: inputData.doctorId,
                    priceId: inputData.selectedPrice,
                    provinceId: inputData.selectedProvince,
                    paymentId: inputData.selectedPayment,
                    nameClinic: inputData.nameClinic,
                    addressClinic: inputData.addressClinic,
                    note: inputData.note,
                });
            }

            resolve({
                errCode: 0,
                errMessage: 'Save doctor information successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }

            let doctor = await db.User.findOne({
                where: { id: id, roleId: 'R2' },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Markdown,
                        as: "markdownData",
                        attributes: ["description", "contentHTML", "contentMarkdown"]
                    },
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    {
                        model: db.Doctor_Infor, as: "doctorInfoData",
                        attributes: {
                            exclude: ["id", "doctorId", "createdAt", "updatedAt"]
                        },
                        include: [
                            { model: db.Allcode, as: "priceData", attributes: ["valueEn", "valueVi"] },
                            { model: db.Allcode, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                            { model: db.Allcode, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                        ]
                    }
                ],
                raw: false,
                nest: true,
            });

            if (doctor && doctor.image) {
                doctor.image = Buffer.from(doctor.image, 'base64').toString('binary');
            }

            resolve({
                errCode: doctor ? 0 : 2,
                data: doctor || {},
                errMessage: doctor ? "OK" : "Doctor not found"
            });

        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }

            console.log('data', data);

            // Không convert date nữa, giữ nguyên
            let schedule = data.arrSchedule.map(item => ({
                ...item,
                maxNumber: +process.env.MAX_NUMBER_SCHEDULE,
            }));

            // Tìm các schedule đã tồn tại
            let existing = await db.Schedule.findAll({
                where: { doctorId: data.doctorId, date: data.formattedDate },
                attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                raw: true,
            });

            // So sánh trực tiếp, không convert date
            let toCreate = _.differenceWith(schedule, existing, (a, b) =>
                a.timeType === b.timeType && a.date === b.date
            );



            if (toCreate && toCreate.length > 0) {
                await db.Schedule.bulkCreate(toCreate);
            }

            resolve({ errCode: 0, errMessage: "OK" });

        } catch (e) {
            reject(e);
        }
    });
};


let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }

            let schedule = await db.Schedule.findAll({
                where: { doctorId: doctorId, date: date },
                include: [
                    {
                        model: db.Allcode,
                        as: 'timeTypeData',
                        attributes: ['valueEn', 'valueVi']
                    }
                ],
                raw: false,
                nest: true
            });

            resolve({
                errCode: 0,
                data: schedule
            });

        } catch (e) {
            reject(e);
        }
    });
};

let getExtraInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }
            let doctorExtraInfor = await db.Doctor_Infor.findOne({
                where: { doctorId: doctorId },
                attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
                include: [
                    { model: db.Allcode, as: "priceData", attributes: ["valueEn", "valueVi"] },

                    { model: db.Allcode, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: false,
                nest: true,

            });

            resolve({
                errCode: doctorExtraInfor ? 0 : 2,
                data: doctorExtraInfor || {},
                errMessage: doctorExtraInfor ? "OK" : "Doctor not found"
            });

        } catch (e) {
            reject(e);
        }
    });
};

let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                });
            }
            let doctor = await db.User.findOne({
                where: { id: doctorId, roleId: 'R2' },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Markdown,
                        as: "markdownData",
                        attributes: ["description", "contentHTML", "contentMarkdown"]
                    },
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    {
                        model: db.Doctor_Infor, as: "doctorInfoData",
                        attributes: {
                            exclude: ["id", "doctorId", "createdAt", "updatedAt"]
                        },
                        include: [
                            { model: db.Allcode, as: "priceData", attributes: ["valueEn", "valueVi"] },
                            { model: db.Allcode, as: "provinceData", attributes: ["valueEn", "valueVi"] },
                            { model: db.Allcode, as: "paymentData", attributes: ["valueEn", "valueVi"] },
                        ]
                    }
                ],
                raw: false,
                nest: true,
            });

            if (doctor && doctor.image) {
                doctor.image = Buffer.from(doctor.image, 'base64').toString('binary');
            }
            resolve({
                errCode: doctor ? 0 : 2,
                data: doctor || {},
                errMessage: doctor ? "OK" : "Doctor not found"
            });
        } catch (e) {
            reject(e);
        }
    });
}

export default {
    getTopDoctorHome,
    getAllDoctors,
    saveDetailInforDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInforDoctorById,
    getProfileDoctorById
};
