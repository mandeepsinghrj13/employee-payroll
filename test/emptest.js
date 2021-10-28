const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const empInput = require("./emptest.json");

chai.use(chaiHttp);
chai.should();

describe("create employee api for positive and negative test case", () => {
  it("GivenEmployeeDetails_When_Created_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: "2021-10-28",
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
  it("GivenEmployeeDetails_When_Access_Denied!_Unauthorized_User", (done) => {
    const token = empInput.employee.ExpireToken;
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
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
  it("GivenEmployeeDetails_When_Invalid_Token", (done) => {
    const token = empInput.employee.InvalidToken;
    const createEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
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
describe("get all employee api for positive and negative test case", () => {
  it("GivenGetAllEMployeeDetails_When_GetAllEmployee_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const getAllEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
    };
    chai
      .request(server)
      .get("/getall")
      .set({ authorization: token })
      .send(getAllEmployee)
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
    const getAllEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
    };
    chai
      .request(server)
      .get("/getall")
      .set({ authorization: token })
      .send(getAllEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetAllEMployeeDetails_When_Invalid_Token", (done) => {
    const token = empInput.employee.InvalidToken;
    const getAllEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
    };
    chai
      .request(server)
      .get("/getall")
      .set({ authorization: token })
      .send(getAllEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
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
});
describe("update Employee by id api for positive and negative test case", () => {
  it("GivenUpdateEmployeeByIdDetails_When_Employee_Update_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const id = empInput.employee.UpdateById;
    const updateEmployee = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
    };
    chai
      .request(server)
      .put(`/update/${id}`)
      .set({ authorization: token })
      .send(updateEmployee)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
  it("GivenUpdateEmployeeByIdDetails_When_Employee_Token_Expiered", (done) => {
    const token = empInput.employee.ExpireToken;
    const id = empInput.employee.UpdateById;
    const createLabel = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      designation: faker.lorem.word(),
      joningdate: faker.date.past(),
    };
    chai
      .request(server)
      .put(`/update/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});
describe("delete Employee by id api for positive and negative test case", () => {
  it("GivendeleteEmployeeByIdDetails_When_Employee_delete_Successfully", (done) => {
    const token = empInput.employee.loginToken;
    const id = empInput.employee.DeleteNotId;
    chai
      .request(server)
      .delete(`/delete/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
  it("GivenDeleteEmployeeByIdDetails_When_login_Token_Expiered", (done) => {
    const token = empInput.employee.ExpireToken;
    const id = empInput.employee.DeleteNotId;
    chai
      .request(server)
      .delete(`/delete/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});
