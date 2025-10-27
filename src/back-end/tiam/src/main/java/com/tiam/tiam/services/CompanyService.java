package com.tiam.tiam.services;

<<<<<<< HEAD
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiam.tiam.models.Address;
=======
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
>>>>>>> CompanyTaks
import com.tiam.tiam.models.Company;
import com.tiam.tiam.repositories.CompanyRepository;

@Service
public class CompanyService {
    
    @Autowired
    private CompanyRepository companyRepository;

<<<<<<< HEAD
    public void createCompany(Company company) {
        
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
=======
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company getCompanyById(UUID id) {
        return companyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found"));
    }

    public Company updateCompany(UUID id, Company company) {
        if (!companyRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }
        // garante que o id do corpo seja o id do recurso a ser atualizado
        company.setId(id);
        return companyRepository.save(company);
    }

    public void deleteCompany(UUID id) {
        if (!companyRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }
        companyRepository.deleteById(id);
    }
>>>>>>> CompanyTaks
}
