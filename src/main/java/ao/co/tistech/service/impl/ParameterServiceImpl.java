package ao.co.tistech.service.impl;

import ao.co.tistech.service.ParameterService;
import ao.co.tistech.domain.Parameter;
import ao.co.tistech.repository.ParameterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Parameter}.
 */
@Service
@Transactional
public class ParameterServiceImpl implements ParameterService {

    private final Logger log = LoggerFactory.getLogger(ParameterServiceImpl.class);

    private final ParameterRepository parameterRepository;

    public ParameterServiceImpl(ParameterRepository parameterRepository) {
        this.parameterRepository = parameterRepository;
    }

    /**
     * Save a parameter.
     *
     * @param parameter the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Parameter save(Parameter parameter) {
        log.debug("Request to save Parameter : {}", parameter);
        return parameterRepository.save(parameter);
    }

    /**
     * Get all the parameters.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Parameter> findAll() {
        log.debug("Request to get all Parameters");
        return parameterRepository.findAll();
    }


    /**
     * Get one parameter by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Parameter> findOne(Long id) {
        log.debug("Request to get Parameter : {}", id);
        return parameterRepository.findById(id);
    }

    /**
     * Delete the parameter by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Parameter : {}", id);
        parameterRepository.deleteById(id);
    }
}
