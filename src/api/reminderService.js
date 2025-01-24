import api from "./api";

export const getRemindersByFilter = ({ patient, date, meal_type, type }) => api.get(`/reminder`, {
    params: {
        patient,
        date,
        meal_type,
        type
    }
});

export const getRemindersDates = (patientId) => api.get("/reminder/dates", {
    params: {
        patientId
    }
});

export const saveReminder = (reminder) => api.post("/reminder", reminder);