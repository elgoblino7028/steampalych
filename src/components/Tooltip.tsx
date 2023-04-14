interface Props {
  text: string;
  buttonText: string;
  onClick?: () => any;
  link?: string
  forField: boolean;
}

function Tooltip({ text, buttonText, link, forField, onClick }: Props) {
  return (
    <div className={"tooltip_wrapper" + (forField ? " text_field__tooltip" : "")}>
      <div className="tooltip__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
        >
          <path
            d="M14,28A14,14,0,0,1,4.1,4.1,14,14,0,0,1,23.9,23.9,13.909,13.909,0,0,1,14,28Zm-.147-15.882a2,2,0,0,0-2,2v5.705a2,2,0,1,0,4,0V14.118A2,2,0,0,0,13.853,12.118Zm0-5.941a2,2,0,1,0,2,2A2,2,0,0,0,13.853,6.177Z"
            fill="#f6c90e"
          />
        </svg>
      </div>
      <div className="tooltip__text">
        <div className="secondary">
          {text}
          {link ? <a href={link} rel="noreferrer" target="_blank"> {buttonText}</a> : <button className="tooltip__button" onClick={() => onClick!()}>{buttonText}</button>}
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
