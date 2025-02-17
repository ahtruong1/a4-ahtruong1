export default function FormInput({type, name, label, form}) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input className="border border-gray-500 rounded-md px-1 w-1/4 min-w-[150px]" type={type} name={name} form={form}/>
        </>
    );
}