import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function LoginForm({ submitHandler }) {
    return (
        <form id="login-form" className="grid justify-items-start gap-4" onSubmit={submitHandler}>
            <div className="w-full grid justify-items-start">
                <Input type="email" name="email" label="Email" form="login-form"/>
            </div>
            <div className="w-full grid justify-items-start">
                <Input type="password" name="password" label="Password" form="login-form"/>
            </div>
            <Button type="submit" variant="text">Login</Button>
        </form>
    );
}