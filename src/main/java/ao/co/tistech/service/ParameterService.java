package ao.co.tistech.service;

import ao.co.tistech.domain.Parameter;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Parameter}.
 */
public interface ParameterService {

    /**
     * Save a parameter.
     *
     * @param parameter the entity to save.
     * @return the persisted entity.
     */
    Parameter save(Parameter parameter);

    /**
     * Get all the parameters.
     *
     * @return the list of entities.
     */
    List<Parameter> findAll();


    /**
     * Get the "id" parameter.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Parameter> findOne(Long id);

    /**
     * Delete the "id" parameter.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
