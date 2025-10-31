package com.tiam.tiam.services;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.tiam.tiam.models.Sale;
import com.tiam.tiam.repositories.SaleRepository;
import java.util.List;
import java.util.UUID;

@Service
public class SaleService {

	private final SaleRepository saleRepository;

	public SaleService(SaleRepository saleRepository) {
		this.saleRepository = saleRepository;
	}

	public List<Sale> findAll() {
		return saleRepository.findAll();
	}

	public Sale findById(UUID id) {
		return saleRepository.findById(id)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sale not found"));
	}

	public Sale create(Sale sale) {
		sale.setId(null);
        sale.setTotalValue(sale.getItems().stream().mapToDouble(item -> item.getValue()).sum());
		return saleRepository.save(sale);
	}

	public Sale update(UUID id, Sale sale) {
		if (!saleRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sale not found");
		}
		sale.setId(id);
		return saleRepository.save(sale);
	}

	public void delete(UUID id) {
		if (!saleRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sale not found");
		}
		saleRepository.deleteById(id);
	}

    public double calculateTotalSalesValue(Sale sale) {
        double total = 0;
        int sizeListItems = sale.getItems().size();

        for (int i = 0; i < sizeListItems; i++) {
            total += sale.getItems().get(i).getValue();
        }
        
        return total;
    }
}
