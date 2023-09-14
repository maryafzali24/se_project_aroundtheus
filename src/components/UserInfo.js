export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._profileImage = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      image: this._profileImage.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    console.log(this._name);
    this._job.textContent = about;
    this._profileImage.src = avatar;
  }
}
