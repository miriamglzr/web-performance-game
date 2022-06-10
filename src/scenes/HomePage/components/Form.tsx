import { useForm, Controller } from "react-hook-form";
import { validatePhoneNumber, preloadValidation } from "./utils";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import s from "./Form.module.css";
import dayjs from "dayjs";

function daysUntilBirthday(date: Date) {
	const today = dayjs();
	const m2 = dayjs(date);

	if (m2.isBefore(today)) {
		m2.add(1, "y");
	}
	return m2.diff(today, "days");
}

export const Form = () => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const birthday = watch("birthday");
	const onSubmit = handleSubmit((data: any) => console.log(data));

	return (
		<section className={s.form}>
			<form onSubmit={onSubmit}>
				<h2>Sign up for the private beta</h2>
				<div>
					<label>Name</label>
					<input
						className={s.input}
						{...register("name", { required: true })}
					/>
					{errors.name && <p className={s.error}>This field is required.</p>}
				</div>
				<div>
					<label>Email</label>
					<input
						className={s.input}
						type="email"
						{...register("email", { required: true, pattern: /.+@.+\..+/ })}
					/>
					{errors.email && (
						<p className={s.error}>
							This field is required and should be an email.
						</p>
					)}
				</div>
				<div>
					<label>Phone number</label>
					<input
						onFocus={preloadValidation}
						className={s.input}
						type="tel"
						{...register("phoneNumber", {
							required: true,
							validate: validatePhoneNumber,
						})}
					/>
					{errors.phoneNumber && (
						<p className={s.error}>
							This field is required and should be a phone number.
						</p>
					)}
				</div>
				<div>
					<label>Birthday</label>
					<Controller
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<DatePicker
								className={s.input}
								{...field}
								selected={field.value}
							/>
						)}
						name="birthday"
					/>
					{errors.birthday && (
						<p className={s.error}>
							This field is required and should be a valid date.
						</p>
					)}
					{birthday && (
						<p>Your birthday is in {daysUntilBirthday(birthday)} days. Nice!</p>
					)}
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</section>
	);
};
export default Form;
