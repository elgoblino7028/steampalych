import FormBlock from "./components/FormBlock";

function App() {
  return (
    <div id="layout">
      <div>
        <div className="scroll_content">
          <div className="App">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
