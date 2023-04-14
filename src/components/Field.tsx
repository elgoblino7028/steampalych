interface Props {
  name: string;
  placeholder: string;
  id: string;
  onChange: (e: any) => any;
  value: string;
}

function Field({ name, placeholder, id, onChange, value }: Props) {
  return (
    <label>
      <span className="text_field__name">{name}</span>
      <input
        id={id ? id : ""}
        onChange={(e) => onChange(e)}
        type="text"
        value={value}
        className="text_field__input"
        placeholder={placeholder}
      />
    </label>
  );
}

export default Field;
