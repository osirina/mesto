export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        // возвращаю объект с данными пользователя,
        // данные подставляются при открытии формы
        return {
          name: this._name.textContent,
          job: this._job.textContent,
        };
      }
    
      // метод принимает данные пользователя и добавляет их на страницу
      setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
      }
    

}