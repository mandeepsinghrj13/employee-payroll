const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const empInput = require("./emptest.json");
const { date } = require("faker");

chai.use(chaiHttp);
chai.should();

describe("registration api for positive and negative test case", () => {
  it("GivenRegistrationDetails_When_Created_Successfully", (done) => {
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .post("/register")
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenRegistrationDetails_When_Date_Invalid", (done) => {
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: date,
    };
    chai
      .request(server)
      .post("/register")
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
  it("GivenRegisterDetails_When_Email_DUP_ENTRY", (done) => {
    const createEmployee = {
      email: "aatmaram@gmail.com",
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .post("/register")
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
});
describe("login for positive and negative ", () => {
  it("GivenLoginDetails_WhenProper_UserLogin_Successfully", (done) => {
    const loginDetails = empInput.employee.Login;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(1);
        done();
      });
  });
  it("GivenLoginDetails_WhenProper_Login_Email_Not_InDatabase", (done) => {
    const loginDetails = empInput.employee.Logindatabase;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(0);
        done();
      });
  });
  it("GivenLoginDetails_WhenProper_Login_Invalid", (done) => {
    const loginDetails = empInput.employee.LoginInvalid;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenLoginDetails_WhenProper_Email_Invalid", (done) => {
    const loginDetails = empInput.employee.EmailInvalid;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
describe("create employee api for positive and negative test case", () => {
  it("GivenCreateEmployeeDetails_When_Created_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .post("/createEmployee")
      .set({ authorization: token })
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenCreateEmployeeDetails_When_Email_DUP_ENTRY", (done) => {
    const createEmployee = {
      email: "new@gmail.com",
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .post("/createEmployee")
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenCreateEmployeeDetails_When_Access_Denied!_Unauthorized_User", (done) => {
    const token = empInput.employee.ExpireToken;
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .post("/createEmployee")
      .set({ authorization: token })
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenCreateEmployeeDetails_When_Invalid_Token", (done) => {
    const token = empInput.employee.InvalidToken;
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .post("/createEmployee")
      .set({ authorization: token })
      .send(createEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
describe("get all employee api for positive and negative test case", () => {
  it("GivenGetAllEMployeeDetails_When_GetAllEmployee_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    chai
      .request(server)
      .get("/getall")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetAllEMployeeDetails_When_Expire_Token", (done) => {
    const token = empInput.employee.ExpireToken;
    chai
      .request(server)
      .get("/getall")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetAllEMployeeDetails_When_Invalid_Token", (done) => {
    const token = empInput.employee.InvalidToken;
    chai
      .request(server)
      .get("/getall")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
describe("get employee by id api for positive and negative test case", () => {
  it("GivenGetEmployeeByIdDetails_When_Employee_GetById_Geting_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const id = empInput.employee.GetId;
    chai
      .request(server)
      .get(`/getbyid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetEmployeeByIdDetails_When_Employee_IdNotFound", (done) => {
    const token = empInput.employee.loginToken;
    const id = empInput.employee.GetNotId;
    chai
      .request(server)
      .get(`/getbyid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetEmployeeByIdDetails_When_Employee_IdNotFound", (done) => {
    const token = empInput.employee.InvalidToken;
    const id = empInput.employee.GetId;
    chai
      .request(server)
      .get(`/getbyid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
describe("update Employee by id api for positive and negative test case", () => {
  it("GivenUpdateEmployeeByIdDetails_When_Employee_Update_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const updateEmployee = {
      id: 46,
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-29",
    };
    chai
      .request(server)
      .put(`/update`)
      .set({ authorization: token })
      .send(updateEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenUpdateEmployeeByIdDetails_When_Employee_Email_Duplicate", (done) => {
    const token = empInput.employee.loginToken;
    const createLabel = {
      id: 46,
      email: "new@gmail.com",
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-22",
    };
    chai
      .request(server)
      .put(`/update`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
describe("delete Employee by id api for positive and negative test case", () => {
  it.skip("GivendeleteEmployeeByIdDetails_When_Employee_delete_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    let id = empInput.employee.DeleteId;
    chai
      .request(server)
      .delete(`/delete`)
      .set({ authorization: token })
      .send(id)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenDeleteEmployeeByIdDetails_When_login_Token_Expiered", (done) => {
    const token = empInput.employee.ExpireToken;
    const id = empInput.employee.DeleteId;
    chai
      .request(server)
      .delete(`/delete`)
      .set({ authorization: token })
      .send(id)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenDeleteEmployeeByIdDetails_When_IdNotIn_Database", (done) => {
    const token = empInput.employee.loginToken;
    const id = empInput.employee.DeleteIdNot;
    chai
      .request(server)
      .delete(`/delete`)
      .set({ authorization: token })
      .send(id)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
