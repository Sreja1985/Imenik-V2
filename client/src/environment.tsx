export const environment = {
  LOGGING: {
    FULL: false,
    DEBUG: false,
    INFO: true,
    RENDERING: false,
    TEST: true,
  },

  ///*SERVERS*///
  frontServer: "http://localhost:3000",
  backendServer: "http://localhost:3001",

  ///METHODS///

  //GET
  getLocation: "/location",
  getHeadquarter: "/headquarter",
  getDepartment: "/department",
  getNumber: "/number",
  getDeletedNumbers: "/number/deleted-numbers",
  //INSERT
  addLocation: "/location/add",
  addHeadquarter: "/headquarter/add",
  addDepartment: "/department/add",
  addNumber: "/number/add",

  //UPDATE
  setLocation: "/location/update",
  setHeadquarter: "/headquarter/update",
  setDepartment: "/department/update",
  setNumber: "/number/update",
 

  //UPDATE VISIBLE/INVISIBLE
  //Location
  setLocationUnVisible: "/location/invisible",
  setLocationVisible: "/location/visible",
  //Headquarter
  setHeadquarterUnVisible: "/headquarter/invisible",
  setHeadquarterVisible: "/headquarter/visible",
  //Department
  setDepartmentUnVisible: "/department/invisible",
  setDepartmentVisible: "/department/visible",
  //Number
  setNumberUnVisible: "/number/invisible",
  setNumberVisible: "/number/visible",
  setNumberDeleted: "/number/delete",
  setNumberReturned: "/number/return",
 

  //COUNTERS
  getLocalityCounter: "number/locality-count",
  getDeletedCounter: "number/deleted-count",
  getVIPCounter: "number/vip-count",
};
