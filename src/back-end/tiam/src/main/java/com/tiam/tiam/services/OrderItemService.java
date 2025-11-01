package com.tiam.tiam.services;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.tiam.tiam.models.OrderItem;
import com.tiam.tiam.models.Product;
import com.tiam.tiam.models.Sale;
import com.tiam.tiam.repositories.OrderItemRepository;
import com.tiam.tiam.repositories.ProductRepository;
import com.tiam.tiam.repositories.SaleRepository;

import java.util.List;
import java.util.UUID;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;

    public OrderItemService(
        OrderItemRepository orderItemRepository,
        ProductRepository productRepository,
        SaleRepository saleRepository
    ) {
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
    }

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public OrderItem findById(UUID id) {
        return orderItemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                "OrderItem not found"
            ));
    }

    public OrderItem create(OrderItem orderItem) {
        // Valida e busca o produto
        Product product = productRepository.findById(orderItem.getProduct().getId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                "Product not found"
            ));

        // Valida e busca a venda
        Sale sale = saleRepository.findById(orderItem.getSale().getId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                "Sale not found"
            ));

        // Define o produto e venda completos
        orderItem.setProduct(product);
        orderItem.setSale(sale);
        
        // Calcula o valor baseado no preço do produto (Integer × Double)
        orderItem.setValue(product.getPrice() * orderItem.getQuantity().doubleValue());

        // Salva o item
        OrderItem savedItem = orderItemRepository.save(orderItem);

        // Atualiza os totais da venda
        recalculateSaleTotals(sale);

        return savedItem;
    }

    public OrderItem update(UUID id, OrderItem orderItem) {
        OrderItem existing = findById(id);

        // Valida e busca o produto se foi alterado
        if (!existing.getProduct().getId().equals(orderItem.getProduct().getId())) {
            Product product = productRepository.findById(orderItem.getProduct().getId())
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, 
                    "Product not found"
                ));
            existing.setProduct(product);
        }

        // Atualiza os campos
        existing.setQuantity(orderItem.getQuantity());
        existing.setObservation(orderItem.getObservation());
        
        // Recalcula o valor (Integer × Double)
        existing.setValue(existing.getProduct().getPrice() * existing.getQuantity().doubleValue());

        // Salva as alterações
        OrderItem updated = orderItemRepository.save(existing);

        // Atualiza os totais da venda
        recalculateSaleTotals(existing.getSale());

        return updated;
    }

    public void delete(UUID id) {
        OrderItem orderItem = findById(id);
        Sale sale = orderItem.getSale();

        orderItemRepository.deleteById(id);

        // Atualiza os totais da venda após remover o item
        recalculateSaleTotals(sale);
    }

    private void recalculateSaleTotals(Sale sale) {
        // Recarrega a venda com os itens atualizados
        Sale updatedSale = saleRepository.findById(sale.getId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                "Sale not found"
            ));

        double totalValue = updatedSale.getItems()
            .stream()
            .mapToDouble(OrderItem::getValue)
            .sum();

        // Soma as quantidades (Integer → Double)
        double totalQuantity = updatedSale.getItems()
            .stream()
            .mapToDouble(item -> item.getQuantity().doubleValue())
            .sum();

        updatedSale.setTotalValue(totalValue);
        updatedSale.setSoldQuantity(totalQuantity);

        saleRepository.save(updatedSale);
    }
}