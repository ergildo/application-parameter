package ao.co.tistech.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Parameter.
 */
@Entity
@Table(name = "parameter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Parameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "value")
    private String value;

    @Column(name = "enable")
    private Boolean enable;

    @ManyToOne
    @JsonIgnoreProperties("parameters")
    private Application application;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Parameter name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Parameter description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getValue() {
        return value;
    }

    public Parameter value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean isEnable() {
        return enable;
    }

    public Parameter enable(Boolean enable) {
        this.enable = enable;
        return this;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public Application getApplication() {
        return application;
    }

    public Parameter application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parameter)) {
            return false;
        }
        return id != null && id.equals(((Parameter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Parameter{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", value='" + getValue() + "'" +
            ", enable='" + isEnable() + "'" +
            "}";
    }
}
