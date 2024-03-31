import Joi from "joi";

export const registerSchema = Joi.object({
    userName:Joi.string().required().trim().messages({
        "any.required":"Username là trường bắt buộc",
        "string.empty":"Username không được để trống",
        "string.trim":"Username không được để khoảng trống"
    }),
    email:Joi.string().email().required().messages({
        "any.required":"Email là trường hợp bắt buộc",
        "string.email":"Email không hợp lệ",
        "string.empty":"Email không được để trống"
    }),
    password: Joi.string().min(6).required().messages({
        "any.required":"Password là trường hợp bắt buộc",
        "string.min":"Password phải có ít nhất {#limit} kí tự",
        "string.empty":"Password không được để trống"
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required":"confirmPassword là trường hợp bắt buộc",
        "any.only":"confirmPassword không trùng khớp",
        "string.empty":"confirmPassword không được để trống "
    }),
    age:Joi.number().max(100).messages({
        "number.max":"Tuổi không hợp lệ",
    })
});
export const signinSchema = Joi.object({
    email:Joi.string().email().required().messages({
        "any.required":"Email là trường hợp bắt buộc",
        "string.email":"Email không hợp lệ",
        "string.empty":"Email không được để trống"
    }),
    password: Joi.string().min(6).required().messages({
        "any.required":"Password là trường hợp bắt buộc",
        "string.min":"Password phải có ít nhất {#limit} kí tự",
        "string.empty":"Password không được để trống"
    }),

    age:Joi.number().max(100).messages({
        "number.max":"Tuổi không hợp lệ",
    })
});