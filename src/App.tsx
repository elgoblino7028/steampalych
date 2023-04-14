import { useState } from "react";
import FormBlock from "./components/FormBlock";
import Modal from "react-modal";

function App() {
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
  const [contactsModalIsOpen, setContactsModalIsOpen] = useState(false);
  return (
    <div id="layout">
      <div>
        <div className="scroll_content">
          <div className="App">
            <Modal
              isOpen={contactsModalIsOpen}
              onRequestClose={() => setContactsModalIsOpen(false)}
              className="modal_window contacts_modal"
              overlayClassName="modal_layout"
            >
              <h3 className="modal_window__title">Контакты</h3>
              <div className="modal_window__content">
                <div className="text">
                  Telegram:
                  <a href="https://t.me/lavahub" className="highlight"> @lavahub</a>
                </div>
                <div className="text">
                  Email:
                  <a href="mailto:steampalych@outlook.com" className="highlight"> Steampalych@outlook.com</a>
                </div>
              </div>
            </Modal>
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
                      faqSpoilers[
                        parseInt(spoiler) as keyof typeof faqSpoilers
                      ];
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
                          style={
                            entry.isShown ? { height: "182px" } : undefined
                          }
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

            <div className="layout_rows">
              <div className="first_row">
                {/* <div className="main_logo">
                  <h1>
                    Steam<span className="highlight">Palych</span>
                  </h1>
                </div> */}
                <div className="main_block">
                  <h1 className="main_title">
                    Пополните баланс аккаунта стим
                    <span className="highlight"> без лишних движений</span>
                  </h1>
                  <span className="main_description">
                    Наш сервис позволяет пользователям из России пополнять
                    баланс Steam, чтобы покупать игры и приложения
                  </span>
                </div>
              </div>
              <div className="second_row">
                <FormBlock />
                <div className="bottom_panel">
                  <div className="links_wrapper">
                    <button
                      className="tooltip__button"
                      onClick={() => setFaqModalIsOpen(true)}
                    >
                      FAQ
                    </button>
                    
                    <button
                      className="tooltip__button"
                    >
                     Публичная оферта 
                    </button>
                    
                    <button
                      className="tooltip__button"
                      onClick={() => setContactsModalIsOpen(true)}
                    >
                      Контакты
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
