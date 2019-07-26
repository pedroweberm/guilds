import guildsData from '../data/guilds.json';
import usersData from '../data/users.json';

export default class Controller {
  constructor() {
    this.users = [];
    this.guilds = [];

    this.activeUser = -1;
  }

  GetActiveUser() {
    return this.activeUser;
  }

  Login(username) {
    const user = this.users.find(tempUser => tempUser.name === username);

    if (this.users.indexOf(user) !== -1) {
      this.activeUser = user.id;
      return true;
    }

    this.activeUser = -1;
    return false;
  }

  AddUser(name, role) {
    let newUser = this.users.find(tempUser => tempUser.name === name);

    if (this.users.indexOf(newUser) !== -1) {
      return false;
    }

    newUser = new User(name, role);
    this.users.push(newUser);
    return true;
  }

  AddGuild(name, managerId, dates, checklist) {
    const newGuild = new Guild(name, managerId);
    dates.forEach((date) => {
      newGuild.AddDate(date);
    });

    checklist.forEach((item) => {
      newGuild.AddChecklistItem(item);
    });

    this.guilds.push(newGuild);
    return newGuild;
  }

  GetUserById(userId) {
    const user = this.users.find(tempUser => tempUser.id === userId);

    if (this.users.indexOf(user) !== -1) {
      return user;
    }
    return -1;
  }

  GetGuildById(guildId) {
    const guild = this.guilds.find(tempGuild => tempGuild.id === guildId);

    if (this.guilds.indexOf(guild) !== -1) {
      return guild;
    }
    return -1;
  }

  Populate() {
    usersData.users.forEach((user) => {
      this.AddUser(user.name, user.role);
    });

    let randomUser = 0;
    guildsData.guilds.forEach((guild) => {
      randomUser = this.users[
        Math.floor(1 + Math.random() * (this.users.length - 1))
      ];
      const newGuild = this.AddGuild(
        guild.name,
        randomUser,
        guild.dates,
        guild.checklist
      );
      randomUser.AddPartGuild(newGuild);
      this.users[0].AddPartGuild(newGuild);
    });

    let randomGuild = 0;
    this.users.forEach((user) => {
      for (let i = 0; i < 3; i += 1) {
        randomGuild = this.guilds[
          Math.floor(Math.random() * this.guilds.length)
        ];
        user.AddPartGuild(randomGuild);
      }
    });
  }
}
class User {
  constructor(name, role) {
    this.id = `_user_ ${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.name = name;
    this.role = role;

    this.partGuilds = [];
    this.managedGuilds = [];
  }

  GetId() {
    return this.id;
  }

  GetName() {
    return this.name;
  }

  GetRole() {
    return this.role;
  }

  SetName(name) {
    this.name = name;
  }

  SetRole(role) {
    this.role = role;
  }

  GetPartGuilds() {
    return this.partGuilds;
  }

  AddPartGuild(guild) {
    if (this.partGuilds.indexOf(guild) === -1) {
      this.partGuilds.push(guild);
    }
  }

  AddManagedGuild(guild) {
    this.managedGuilds.push(guild);
  }

  RemovePartGuild(guildId) {
    this.partGuilds.splice(
      this.partGuilds.indexOf(
        this.partGuilds.find(guild => guild.id === guildId)
      ),
      1
    );
  }
}

class Guild {
  constructor(name, manager) {
    this.id = `_guild_ ${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.name = name;
    this.manager = manager;

    this.dates = [];
    this.checklist = [];
  }

  GetId() {
    return this.id;
  }

  GetName() {
    return this.name;
  }

  GetManager() {
    return this.manager;
  }

  GetDates() {
    return this.dates;
  }

  GetChecklist() {
    return this.checklist;
  }

  SetName(name) {
    this.name = name;
  }

  SetManager(manager) {
    this.manager = manager;
  }

  AddDate(date) {
    this.dates.push(date);
  }

  AddChecklistItem(item) {
    const checklistItem = {
      checked: false,
      description: item
    };

    this.checklist.push(checklistItem);
  }
}
