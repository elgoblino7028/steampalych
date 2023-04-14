import Form from "./Form";

function FormBlock()  {
  return (
    <div className="form_block">
      <h2 className="margin_bottom-20" id="payment_title">
        Пополните баланс
        <span className="highlight"> Steam</span>
      </h2>
      <Form /> 
    </div>
  );
}

export default FormBlock;