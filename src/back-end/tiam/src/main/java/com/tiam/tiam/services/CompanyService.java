package com.tiam.tiam.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiam.tiam.models.Address;
import com.tiam.tiam.models.Company;
import com.tiam.tiam.repositories.CompanyRepository;

@Service
public class CompanyService {
    
    @Autowired
    private CompanyRepository companyRepository;

    public void createCompany(Company company) {
        
    if (company.getAddress() == null) {
            Address defaultAddress = new Address();
            defaultAddress.setStreet("A definir");
            defaultAddress.setCity("A definir");
            defaultAddress.setState("A definir");
            defaultAddress.setZipCode("00000-000");
            defaultAddress.setNeighborhood("A definir");
            defaultAddress.setNumber("S/N");
            defaultAddress.setUf("XX");
    }
        companyRepository.save(company);
        System.out.println("Criou por aqui ");
    }

    public Optional<Company> getCompanyById(UUID id) {
        Optional<Company> companyIsPresent = companyRepository.findById(id);
        if (companyIsPresent.isPresent()) {
            return companyIsPresent;
        } else {
            return Optional.empty(); 
        }
    }

    public void deleteCompany(UUID id) {
        companyRepository.deleteById(id);
    }

    public Company updateCompany(Company company) {
        if (company.getId()==null) {
            throw new IllegalArgumentException("Nao existe empresa com esse ID");
        }
        return companyRepository.save(company);
    }
}
