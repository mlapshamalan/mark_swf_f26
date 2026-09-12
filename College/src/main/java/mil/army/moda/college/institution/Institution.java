package mil.army.moda.college.institution;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
public class Institution {

    @Id
    private Long id;
    @NotNull
    private String name;

    public Institution() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Institution(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
