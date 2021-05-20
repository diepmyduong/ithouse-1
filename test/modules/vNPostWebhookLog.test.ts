import vNPostWebhookLogResolver from "../../src/graphql/modules/vNPostWebhookLog/vNPostWebhookLog.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { VNPostWebhookLogModel } from "../../src/graphql/modules/vNPostWebhookLog/vNPostWebhookLog.model";
import { getAdminContext } from "../utils/context";

let vNPostWebhookLog: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllVNPostWebhookLog", () => {
  it("shold return an array", async (done) => {
    let result = await vNPostWebhookLogResolver.Query.getAllVNPostWebhookLog({}, {}, context);

    expect(result).to.be.an("object");
    expect(result.data).to.be.an("array");
    expect(result.total).to.be.a("number");
    expect(result.pagination).to.be.an("object");
    expect(result.pagination.limit).to.be.a("number");
    expect(result.pagination.offset).to.be.a("number");
    expect(result.pagination.page).to.be.a("number");
    done();
  });
});

describe("# Test createVNPostWebhookLog", () => {
  it("shold return an array", async (done) => {
    let result: any = await vNPostWebhookLogResolver.Mutation.createVNPostWebhookLog(
      {},
      { data },
      context
    );
    result = result.toJSON();
    vNPostWebhookLog = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneVNPostWebhookLog", () => {
  it("shold return an object", async (done) => {
    let result: any = await vNPostWebhookLogResolver.Query.getOneVNPostWebhookLog(
      {},
      { id: vNPostWebhookLog._id },
      context
    );

    console.log(vNPostWebhookLog);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateVNPostWebhookLog", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await vNPostWebhookLogResolver.Mutation.updateVNPostWebhookLog(
      {},
      {
        id: vNPostWebhookLog._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    vNPostWebhookLog = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneVNPostWebhookLog", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await vNPostWebhookLogResolver.Mutation.deleteOneVNPostWebhookLog(
      {},
      {
        id: vNPostWebhookLog._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(vNPostWebhookLog.id);
    done();
  });
});

describe("# Test deleteManyVNPostWebhookLog", () => {
  it("shold return an object", async (done) => {
    let records = await VNPostWebhookLogModel.create([
      {
        name: faker.name.title(),
      },
      {
        name: faker.name.title(),
      },
      {
        name: faker.name.title(),
      },
    ]);

    let ids = records.map((r) => r.get("id"));

    let result: any = await vNPostWebhookLogResolver.Mutation.deleteManyVNPostWebhookLog(
      {},
      {
        ids: ids,
      },
      context
    );

    expect(result).to.be.a("number");
    expect(result).to.equal(records.length);
    done();
  });
});
