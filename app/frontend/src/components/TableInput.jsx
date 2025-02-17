export default function TableInput({type, name, placeholder, form = "", defaultValue= "",  disabled = false}) {
    return (
        <>
            <input className="w-[100%] border-box border-gray-500 rounded-md px-1 mx-1"
                   type={type}
                   placeholder={placeholder}
                   name={name}
                   form={form}
                   {...(defaultValue && { defaultValue: defaultValue })}
                   disabled={disabled}
            />
        </>
    );
}