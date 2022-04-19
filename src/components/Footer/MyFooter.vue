<template>
  <div class="footer">
        <div class="logo_line">
              PARTSHOP SITE
        </div>
        <div class="middle_content">
          <div class="left_content">
              <div class="head">
                  УЗНАЙТЕ БОЛЬШЕ
              </div>
              <ul>
                <li>ЧАСТО ЗАДАВАЕМЫ ВОПРОСЫ</li>
                <li>ВОПРОСЫ СОТРУДНИЧЕСТВА</li>
                <li>КОНТАКТНЫЕ ДАННЫЕ</li>
                <li>ПРО НАС</li>
              </ul>
          </div>
          <div class="right_content">
            <div class="head">
              НОВОСТНАЯ ЛЕНТА
            </div>
            <ul>
              <li>Отправьте свой Email, чтобы подписаться на рассылку.</li>
              <li>
                <div class="email-send p-inputgroup">
                  <InputText placeholder="Email"/>
                  <Button label="Отправить" class="p-button-success"/>
                </div>
              </li>
            </ul>


          </div>
        </div>
        <div class="bottom_content">
          &#169;PARTSHOP SITE 2022
        </div>

  </div>
</template>

<script>


export default {
  name: "MyFooter",

}
</script>

<style scoped>
    .footer {
        background: var(--green-100);
        display: flex;
        flex-direction:column;
        align-items: center;
        min-height: 320px;
    }
    .footer ul {
      margin-left: 0;
      padding-left: 0;
    }
    .footer ul li {
        list-style-type: none;
        color: var(--gray-700);
        text-shadow: 0px 0px 1px var(--green-600);
        letter-spacing: 2px;
        font-size: 14px;
        margin-top: 7px;
    }
    .footer .logo_line {
      padding-top: 20px;
      font-size: 20px;
      letter-spacing: 5px;
      color: var(--gray-800);
      text-shadow: 0px 0px 1px var(--green-700);
      font-weight: 300;
    }
    .footer .middle_content {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-top: 50px;
    }
    .middle_content .left_content {
        padding-left: 20px;
    }
    .middle_content .right_content {
      margin-right: 20px;
    }
    .head {
      width: 90%;
      border-bottom: 1px solid var(--green-800);
      padding-bottom: 20px;
      color: var(--gray-700);
      text-shadow: 0px 0px 2px var(--green-600);
      letter-spacing: 2px;
      font-size: 16px;
    }
    .email-send {
      max-width: 400px;
    }
    .bottom_content {
      padding-bottom: 20px;
      font-size: 14px;
      letter-spacing: 5px;
      color: var(--gray-500);
      text-shadow: 0px 0px 1px var(--green-700);
      font-weight: 300;
    }
</style>