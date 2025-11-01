package com.tiam.tiam.services;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.tiam.tiam.models.OrderItem;
import com.tiam.tiam.models.Product;
import com.tiam.tiam.models.Sale;
import com.tiam.tiam.repositories.ProductRepository;
import com.tiam.tiam.repositories.SaleRepository;
import java.util.List;
import java.util.UUID;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleService(SaleRepository saleRepository, ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
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
        validateAndEnrichItems(sale);
        calculateAndSetSaleTotals(sale);
        return saleRepository.save(sale);
    }

    public Sale update(UUID id, Sale sale) {
        if (!saleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sale not found");
        }
        sale.setId(id);
        validateAndEnrichItems(sale);
        calculateAndSetSaleTotals(sale);
        return saleRepository.save(sale);
    }

    public void delete(UUID id) {
        if (!saleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sale not found");
        }
        saleRepository.deleteById(id);
    }

    private void validateAndEnrichItems(Sale sale) {
        if (sale.getItems() == null || sale.getItems().isEmpty()) {
            return;
        }

        for (OrderItem item : sale.getItems()) {
            // Valida e busca o produto
            Product product = productRepository.findById(item.getProduct().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, 
                    "Product not found: " + item.getProduct().getId()
                ));

            // Atribui o produto completo ao item
            item.setProduct(product);
            
            // Calcula o valor baseado no preço do produto e quantidade (Integer → Double)
            item.setValue(product.getPrice() * item.getQuantity().doubleValue());
            
            // Estabelece o relacionamento bidirecional
            item.setSale(sale);
        }
    }

    private void calculateAndSetSaleTotals(Sale sale) {
        if (sale.getItems() == null || sale.getItems().isEmpty()) {
            sale.setTotalValue(0.0);
            sale.setSoldQuantity(0.0);
            return;
        }

        double totalValue = sale.getItems()
            .stream()
            .mapToDouble(OrderItem::getValue)
            .sum();

        // Soma as quantidades (Integer → Double)
        double totalQuantity = sale.getItems()
            .stream()
            .mapToDouble(item -> item.getQuantity().doubleValue())
            .sum();

        sale.setTotalValue(totalValue);
        sale.setSoldQuantity(totalQuantity);
    }
}