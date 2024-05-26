const Company = require('../models/company');
const User = require('../models/user'); // Ensure this is correctly imported

const companyController = {
    createCompany: async (request, response) => {
        try {
            const { name, location } = request.body;
            const userId = request.userId;

            const existingCompany = await Company.findOne({ name });

            if (existingCompany) {
                return response.status(400).json({ message: 'Company already exists' });
            }

            const newCompany = new Company({
                name,
                location,
                createdBy: userId
            });

            const savedCompany = await newCompany.save();

            response.status(201).json({ message: 'Company created successfully', company: savedCompany });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getCompanies: async (request, response) => {
        try {
            const companies = await Company.find().populate('createdBy');
            response.status(200).json({ companies });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getCompanyByID: async (request, response) => {
        try {
            const { id } = request.params;
            const company = await Company.findById(id).populate('createdBy', 'username name role -_id');
            if (!company) {
                return response.status(404).json({ message: 'Company not found' });
            }
            response.status(200).json({ company });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateCompanyByID: async (request, response) => {
        try {
            const { id } = request.params;
            const { name, location } = request.body;

            const company = await Company.findById(id);

            if (!company) {
                return response.status(404).json({ message: 'Company not found' });
            }

            company.name = name || company.name;
            company.location = location || company.location;

            const updatedCompany = await company.save();

            response.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteCompanyByID: async (request, response) => {
        try {
            const { id } = request.params;

            const company = await Company.findById(id);

            if (!company) {
                return response.status(404).json({ message: 'Company not found' });
            }

            await Company.findByIdAndDelete(id);

            response.status(200).json({ message: 'Company deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
};

module.exports = companyController;
