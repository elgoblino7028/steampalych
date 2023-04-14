import { useState } from "react";
import Field from "./Field";
import Tooltip from "./Tooltip";
import Modal from "react-modal";

function Form() {
  const [faqModalIsOpen, setFaqModalIsOpen] = useState(false);
  const [faqSpoilers, setFaqSpoilers] = useState({
    1: {
      title: "ВАЖНО! Требования к акканту",
      text: "Есть перечень требований к аккаунту, соответствие которых позволит нам совершить пополнение баланса: Страной Вашего аккаунта должна быть Россия (и следовательно, валюта аккаунта — рубли). Также мы НЕ можем отправить средства пользователям из следующих регионов: Крым, ЛНР, ДНР и тем пользователям, на аккаунте которых красная табличка (КТ).",
      isShown: false,
    },
    2: {
      title: "Политика возраста",
      text: "Если вы проигнорировали требования к аккаунту и все же попытались отправить себе средства, то они не дойдут. В этом случае Вы вправе запросить возврат в ТП. На Qiwi-кошелек средства будут возвращены с вычетом 2% от суммы. Сумма возврата любая. На Карту банка средства будут возвращены с вычетом 50р и 3% от суммы. Возврат осуществляется до 7 рабочих дней.",
      isShown: false,
    },
    3: {
      title: "Не приходят деньги на баланс аккаунта Steam",
      text: "Если Вы указали верно ЛОГИН (это не никнейм) и баланс Вашего аккаунта - рубли (₽), пополнение происходит от 1 минуты до 2 часов. Если Вам не поступили средства на баланс в течении 10 минут, пожалуйста обратитесь в Техническую поддержку.",
      isShown: false,
    },
    4: {
      title: "Я указал неверный логин",
      text: "Если такого логина в Steam не существует, то деньги не пропадут и мы сможем отправить их на корректный логин. Незамедлительно обратитесь в Техническую поддержку и укажите какой логин написали при заказе, а какой логин — верный",
      isShown: false,
    },
    5: {
      title: 'Что такое "логин"?',
      text: "Логин — это то что вы вводите при авторизации, у каждого пользователя он уникальный, а никнейм вы можете менять по своему усмотрению. Людей с ником QWERTY может быть сотни. Не перепутайте ваш логин и никнейм.",
      isShown: false,
    },
  });
  const [form, setForm] = useState({
    login: {
      value: "",
      error: false,
    },
    amount: {
      value: "",
      error: false,
      errorText: "",
    },
    payment: {
      value: -1,
      error: false,
    },
  });

  function handleAmount(val: string) {
    if (parseInt(val) < 300) {
      setForm({
        ...form,
        amount: {
          ...form.amount,
          error: true,
          errorText: "Минимальная сумма равна 300 ₽",
          value: val,
        },
      });
      return;
    }
    setForm({ ...form, amount: { ...form.amount, value: val, error: false } });
  }

  function handleSubmit() {
    setForm((prevForm) => {
      let valid = true;
      if (prevForm.login.value.length === 0) {
        valid = false;
        return { ...prevForm, login: { ...prevForm.login, error: true } };
      }
      if (/[a-zA-Z]/g.test(prevForm.amount.value)) {
        valid = false;
        return {
          ...prevForm,
          amount: {
            ...prevForm.amount,
            error: true,
            errorText: "Введите только целое число",
          },
        };
      }
      if (parseInt(prevForm.amount.value) < 300) {
        valid = false;
        return {
          ...prevForm,
          amount: {
            ...prevForm.amount,
            error: true,
            errorText: "Минимальная сумма равна 300 ₽",
          },
        };
      }
      if (prevForm.amount.value.length === 0) {
        valid = false;
        return {
          ...prevForm,
          amount: {
            ...prevForm.amount,
            error: true,
            errorText: "Введите сумму",
          },
        };
      }
      if (prevForm.payment.value < 0) {
        valid = false;
        return { ...prevForm, payment: { ...prevForm.payment, error: true } };
      }
      if (!valid) {
        console.log("invalid");
        return prevForm;
      }
      console.log("valid");
      return prevForm;
    });
  }

  return (
    <div className="form_fields margin_top-15">
      <Modal
        isOpen={faqModalIsOpen}
        onRequestClose={() => setFaqModalIsOpen(false)}
        className="modal_window"
        overlayClassName="modal_layout"
      >
        <h3 className="modal_window__title">FAQ</h3>
        <div className="modal_window__content">
          <div className="faq_spoilers">
            {Object.keys(faqSpoilers).map((spoiler: string) => {
              const entry =
                faqSpoilers[parseInt(spoiler) as keyof typeof faqSpoilers];
              return (
                <div className="spoiler_block">
                  <div
                    className="spoiler_block__header"
                    onClick={() =>
                      setFaqSpoilers({
                        ...faqSpoilers,
                        [parseInt(spoiler) as keyof typeof faqSpoilers]: {
                          ...entry,
                          isShown: !entry.isShown,
                        },
                      })
                    }
                  >
                    {entry.title}
                  </div>
                  <div
                    className="spoiler_block__content"
                    style={entry.isShown ? { height: "182px" } : undefined}
                  >
                    <div className="spoiler_block__content_inner">
                      {entry.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
      <div className="margin_bottom-10">
        <Tooltip
          text="Рекомендуем сначала ознакомиться с нашим"
          buttonText=" FAQ"
          onClick={() => setFaqModalIsOpen(true)}
          forField={false}
        />
      </div>
      <div className="text_field_wrapper full_width">
        <Field
          name="Логин Steam"
          placeholder="Введите логин"
          id="login"
          onChange={(e) =>
            setForm({
              ...form,
              login: { ...form.login, value: e.target.value, error: false },
            })
          }
          value={form.login.value}
        />
        {form.login.error ? (
          <div className="text_field__error_message">Введите логин</div>
        ) : null}
        <Tooltip
          text="Вы можете найти свой логин на"
          link="https://store.steampowered.com/account/"
          buttonText="этой странице"
          forField
        />
      </div>
      <div className="text_field_wrapper full_width">
        <span className="text_field__name">Сумма пополнения</span>
        <div className="text_field__input_wrapper">
          <input
            type="text"
            id="amount"
            className="text_field__input"
            placeholder="Введите сумму"
            value={form.amount.value}
            onChange={(e) => handleAmount(e.target.value)}
          />
          <div className="text_field__buttons_wrapper">
            <div
              className="text_field__button"
              tabIndex={0}
              onClick={() =>
                setForm({
                  ...form,
                  amount: { ...form.amount, value: "300", error: false },
                })
              }
            >
              <span className="text_field__button_name">300</span>
            </div>
            <div
              className="text_field__button"
              tabIndex={0}
              onClick={() =>
                setForm({
                  ...form,
                  amount: { ...form.amount, value: "500", error: false },
                })
              }
            >
              <span className="text_field__button_name">500</span>
            </div>
            <div
              className="text_field__button"
              tabIndex={0}
              onClick={() =>
                setForm({
                  ...form,
                  amount: { ...form.amount, value: "750", error: false },
                })
              }
            >
              <span className="text_field__button_name">750</span>
            </div>
            <div
              className="text_field__button"
              tabIndex={0}
              onClick={() =>
                setForm({
                  ...form,
                  amount: { ...form.amount, value: "1000", error: false },
                })
              }
            >
              <span className="text_field__button_name">1000</span>
            </div>
          </div>
        </div>
        {form.amount.error ? (
          <div className="text_field__error_message">
            {form.amount.errorText}
          </div>
        ) : null}
      </div>
      <div className="payment_methods_section margin_top-15">
        <span className="small_title">Способ оплаты</span>
        <div className="payment_methods_wrapper margin_top-10">
          <div
            className={
              "payment_method" + (form.payment.value === 0 ? " selected" : "")
            }
            onClick={() =>
              setForm({
                ...form,
                payment: { ...form.payment, value: 0, error: false },
              })
            }
          >
            <div className="payment_method__block">
              <div className="payment_method__icon qiwi"></div>
            </div>
            <span className="payment_method__name">QIWI кошелёк</span>
          </div>
          <div
            className={
              "payment_method" + (form.payment.value === 1 ? " selected" : "")
            }
            onClick={() =>
              setForm({
                ...form,
                payment: { ...form.payment, value: 1, error: false },
              })
            }
          >
            <div className="payment_method__block">
              <div className="payment_method__icon bank_cards"></div>
            </div>
            <span className="payment_method__name">Банковские карты</span>
          </div>
        </div>
        {form.payment.error ? (
          <div className="error_message">Выберите способ оплаты</div>
        ) : null}
      </div>
      {!form.amount.error && !/[a-zA-Z]/g.test(form.amount.value) && form.amount.value.length > 0 ?
        <div className="margin_top-15">
          <span className="small_title">Информация о сумме</span>
          <div className="information_block">
            <span className="information_block__name">
              На баланс поступит (приблизительно):{" "}
            </span>
            <span className="information_block__value">{form.amount.value}.00 ₽</span>
          </div>
          <div className="information_block">
            <span className="information_block__name">Комиссия: </span>
            <span className="information_block__value">{(parseInt(form.amount.value)*(0.05)).toFixed(2)} ₽</span>
          </div>
          <div className="information_block">
            <span className="information_block__name">Всего к оплате: </span>
            <span className="information_block__value">{(parseInt(form.amount.value)*(1.05)).toFixed(2)} ₽</span>
          </div>
        </div>
      : null}
      <div className="small_text margin_top-15">
        Нажимая на кнопку ниже, Вы подтверждаете, что ознакомлены и соглашаетесь
        с<button className="tooltip__button"> публичной офертой</button>
      </div>
      <button
        className="primary full_width margin_top-5"
        disabled={form.amount.error}
        onClick={() => handleSubmit()}
      >
        Перейти к оплате
      </button>
    </div>
  );
}

export default Form;
