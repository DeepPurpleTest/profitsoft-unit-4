import bodyParser from 'body-parser';
import express from 'express';
import sinon, {SinonStub} from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import routers from 'src/routers/tasks';
import Task from 'src/model/task';
import * as taskValidator from 'src/services/task';
import {ObjectId} from "mongodb";
import mongoSetup from "../mongoSetup";

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use('/', routers);

describe('Task controller', () => {
  let validateTaskStub: SinonStub;

  before(async () => {
    await mongoSetup;
    validateTaskStub = sinon.stub(taskValidator, 'validateTask').resolves(true);
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  it('should list the tasks', (done) => {
    const tasks = [
      {
        _id: new ObjectId().toString(),
        name: "Task 1",
        description: "Task 1",
        projectId: 1,
        assigneeId: 1,
        reporterId: 1,
      },
      {
        _id: new ObjectId().toString(),
        name: "Task 2",
        description: "Task 2",
        projectId: 1,
        assigneeId: 1,
        reporterId: 2,
      },
    ];

    Task.insertMany(tasks).then( () => {
      chai.request(app)
        .get('')
        .query({ projectId: 1, size: 5, from: 0 })
        .end((_, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);

          done();
        });
    }
    ).catch(done);
  },
  );

  it('should save the task', (done) => {
    const task =
        {
          name: 'Task 1',
          description: 'Task 1',
          project_id: '1',
          assignee_id: '1',
          reporter_id: '1',
        };


    chai.request(app)
      .post('')
      .send({ ...task })
      .end((_, res) => {
        expect(validateTaskStub.calledOnce).to.be.true;

        res.should.have.status(201);
        expect(res.body).to.have.property('id');

        done();
      });
  },
  );

  it('should list of tasks count', (done) => {

    const tasks = [
      {
        _id: new ObjectId().toString(),
        name: "Task 1",
        description: "Task 1",
        projectId: 1,
        assigneeId: 1,
        reporterId: 2,
      },
      {
        _id: new ObjectId().toString(),
        name: "Task 1",
        description: "Task 1",
        projectId: 2,
        assigneeId: 2,
        reporterId: 3,
      },
      {
        _id: new ObjectId().toString(),
        name: "Task 1",
        description: "Task 1",
        projectId: 3,
        assigneeId: 4,
        reporterId: 5,
      },
    ];

    const projectsDto =
      {
        projects_ids: [1,2,3],
      };

    Task.insertMany(tasks).then( () => {
      chai.request(app)
        .post('/_counts')
        .send({...projectsDto})
        .end((_, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal({
            1: 1,
            2: 1,
            3: 1,
          });

          done();
        });
    }
    ).catch(done);
  },
  );
});
