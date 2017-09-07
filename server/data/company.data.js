const ObjectId = require('mongodb').ObjectID;

const BaseData = require('./base/base.data');
const Company = require('./models/company.model');

class CompaniesData extends BaseData {
  constructor(db) {
    super(db, Company, Company);
  }

  create(company) {
    if (!this._isModelValid(company)) {
      return Promise.reject('Invalid company');
    }
    return this.collection.findOne({
      userId: company.userId,
    }).then((companyExist) => {
      if (companyExist) {
        return Promise.reject('Company already taken!');
      }

      company.jobs = [];
      return this.collection.insert(company);
    }).then(() => {
      return this.ModelClass.toViewModel(company);
    });
  }

  getByUserId(id) {
    return this.collection.findOne({ userId: id });
  }

  updateCurrentCompany(company) {
    if (!this._isModelValid(company)) {
      return Promise.reject('Invalid company');
    }
    if(company === undefined){
        return Promise.reject('Undefined company');
    }
    return this.collection.findOne({
      userId: company.userId,
    }).then((comp) => {
        return this.collection.updateOne({ userId: company.userId }, 
        { $set: 
          { 
            'name': company.name, 
            'vat': company.vat, 
            'field': company.field
          }
        }, { upsert: true });
    }).then(() => {
      return this.ModelClass.toViewModel(company)
    });
  }

  deleteCurrentCompany(id) {
    return this.collection.findOne({
      userId: id,
    })
     .then((company) => {
       return this.collection.remove(company);
     });
  }

  getJobsOfCompany(id) {
    return this.collection.findOne({
      userId: id
    })
     .then((company) => {
       return company.jobs;
     }); 
  }

  addJobToCompany(id, job) {
    return this.getByUserId(id)
    .then((company) => {
      return this.collection.update({
        _id: company._id
      }, {$addToSet: {jobs: job }})
    })
    .then(() => {
      return this.getByUserId(id)
        .then((comp) => {
          return this.ModelClass.toViewModel(comp);
        });
    })
  }

  updateJobsOfCompany(companyId, jobId, jobToUpdate, jobs) {
      return this.collection.getById(id)
        .then((comp) => {
            comp.jobs.forEach((job) => {
                if(job.id === jobId) {
                    jobs.updateJob(job);
                }
            });

            return comp.jobs;
        });
  }
}

module.exports = CompaniesData;