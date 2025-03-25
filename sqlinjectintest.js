// WARNING: This code is for educational and testing purposes only.
// Do NOT use this in a production environment.

import java.sql.*;
import java.util.Scanner;

public class SQLInjectionTest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();
        
        // Vulnerable SQL query (DO NOT USE IN PRODUCTION)
        String query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        
        System.out.println("Executing query: " + query);
        
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test_db", "root", "");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            
            if (rs.next()) {
                System.out.println("Login successful");
            } else {
                System.out.println("Invalid credentials");
            }
            
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        scanner.close();
    }
}

// Example exploit:
// Input: username: ' OR '1'='1 -- 
//        password: anything
