export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ nameInput, jobInput }) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }

  // setAvatar(avatar) {
  //   this._userAvatar.src = avatar;
  // }
}
