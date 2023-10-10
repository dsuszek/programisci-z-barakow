package org.kainos.ea.db;

import org.kainos.ea.exception.FailedToCreateJobRoleException;
import org.kainos.ea.model.JobRole;
import org.kainos.ea.model.JobRoleRequest;

import java.sql.*;

public class JobRoleDao {
    public JobRole createJobRole(JobRoleRequest jobRole) throws SQLException, FailedToCreateJobRoleException {

        DatabaseConnector databaseConnector = new DatabaseConnector();

        Connection c = databaseConnector.getConnection();

        String insertStatement = "INSERT INTO `JobRoles` (name, description, link) VALUES (?, ?, ?);";

        PreparedStatement st = c.prepareStatement(insertStatement, Statement.RETURN_GENERATED_KEYS);

        st.setString(1, jobRole.getName());
        st.setString(2, jobRole.getDescription());
        st.setString(3, jobRole.getLink());

        st.executeUpdate();

        ResultSet rs = st.getGeneratedKeys();

        if (!rs.next()) {
            throw new FailedToCreateJobRoleException("No job role id have been returned");
        }
        return new JobRole
                (rs.getShort(1),
                        jobRole.getName(),
                        jobRole.getDescription(),
                        jobRole.getLink());
    }
}
