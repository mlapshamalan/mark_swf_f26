-- 1. Populate Lookup Tables
INSERT INTO account_status (account_status_name)
VALUES ('active'),
       ('locked'),
       ('suspended'),
       ('disabled'),
       ('pending') ON CONFLICT DO NOTHING;

INSERT INTO user_role (user_role_name)
VALUES ('vendor'),
       ('buyer'),
       ('admin'),
       ('analyst'),
       ('moderator'),
       ('guest') ON CONFLICT DO NOTHING;

INSERT INTO device_type (device_type_name)
VALUES ('desktop'),
       ('mobile'),
       ('tablet'),
       ('kiosk'),
       ('server') ON CONFLICT DO NOTHING;

INSERT INTO operating_system (operating_system_name)
VALUES ('Windows'),
       ('macOS'),
       ('Linux'),
       ('Android'),
       ('iOS') ON CONFLICT DO NOTHING;

INSERT INTO browser_name (browser_name_name)
VALUES ('Chrome'),
       ('Firefox'),
       ('Edge'),
       ('Safari'),
       ('Tor') ON CONFLICT DO NOTHING;

INSERT INTO event_type (event_type_name)
VALUES ('login'),
       ('logout'),
       ('password_change'),
       ('purchase'),
       ('file_access'),
       ('account_update'),
       ('admin_action') ON CONFLICT DO NOTHING;

INSERT INTO event_category (event_category_name)
VALUES ('authentication'),
       ('transaction'),
       ('system'),
       ('user_management'),
       ('security') ON CONFLICT DO NOTHING;

INSERT INTO action_taken (action_taken_name)
VALUES ('allow'),
       ('deny'),
       ('block'),
       ('flag'),
       ('alert') ON CONFLICT DO NOTHING;

INSERT INTO status (status_name)
VALUES ('success'),
       ('failed'),
       ('blocked'),
       ('pending') ON CONFLICT DO NOTHING;

INSERT INTO severity (severity_name)
VALUES ('low'),
       ('medium'),
       ('high'),
       ('critical') ON CONFLICT DO NOTHING;

INSERT INTO resource_type (resource_type_name)
VALUES ('user_account'),
       ('product_listing'),
       ('transaction_record'),
       ('admin_panel'),
       ('file_storage'),
       ('api_endpoint') ON CONFLICT DO NOTHING;

INSERT INTO failure_reason (failure_reason_name)
VALUES ('invalid_password'),
       ('invalid_username'),
       ('account_locked'),
       ('insufficient_permissions'),
       ('timeout'),
       ('suspicious_activity'),
       ('system_error') ON CONFLICT DO NOTHING;

-- 2. Insert Normalized Sample Logs
INSERT INTO security_logs (event_time, username, ip_address, port_number, location_city, location_region,
                           location_country,
                           resource_name, session_id, risk_score, watchlist_flag, notes,
                           account_status_id, user_role_id, device_type_id, operating_system_id, browser_name_id,
                           event_type_id, event_category_id, action_taken_id, status_id, severity_id, resource_type_id,
                           failure_reason_id)
VALUES ('2026-08-19 08:14:02+00', 'j_doe', '192.168.1.45', 443, 'Austin', 'Texas', 'US', 'login_page', 9841203, 10,
        FALSE, 'Normal authentication', 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, NULL),
       ('2026-08-19 08:16:45+00', 'm_smith', '10.0.0.12', 22, 'London', 'England', 'GB', 'admin_panel', 9841204, 85,
        TRUE, 'Failed sudo access attempt', 2, 4, 1, 3, 2, 7, 5, 3, 2, 4, 4, 4),
       ('2026-08-19 08:20:10+00', 'a_wang', '172.16.0.8', 8080, 'Toronto', 'Ontario', 'CA', 'checkout_api', 9841205, 25,
        FALSE, 'Purchase transaction processed', 1, 2, 2, 5, 4, 4, 2, 1, 1, 1, 3, NULL);