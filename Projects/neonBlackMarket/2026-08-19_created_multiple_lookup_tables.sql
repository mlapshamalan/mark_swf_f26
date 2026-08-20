CREATE TABLE account_status
(
    account_status_id   SMALLSERIAL PRIMARY KEY,
    account_status_name VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE user_role
(
    user_role_id   SMALLSERIAL PRIMARY KEY,
    user_role_name VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE device_type
(
    device_type_id   SMALLSERIAL PRIMARY KEY,
    device_type_name VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE operating_system
(
    operating_system_id   SMALLSERIAL PRIMARY KEY,
    operating_system_name VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE browser_name
(
    browser_name_id   SMALLSERIAL PRIMARY KEY,
    browser_name_name VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE event_type
(
    event_type_id   SMALLSERIAL PRIMARY KEY,
    event_type_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE event_category
(
    event_category_id   SMALLSERIAL PRIMARY KEY,
    event_category_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE action_taken
(
    action_taken_id   SMALLSERIAL PRIMARY KEY,
    action_taken_name VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE status
(
    status_id   SMALLSERIAL PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE severity
(
    severity_id   SMALLSERIAL PRIMARY KEY,
    severity_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE resource_type
(
    resource_type_id   SMALLSERIAL PRIMARY KEY,
    resource_type_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE failure_reason
(
    failure_reason_id   SMALLSERIAL PRIMARY KEY,
    failure_reason_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE security_logs
(
    log_id              BIGSERIAL PRIMARY KEY,
    event_time          TIMESTAMPTZ DEFAULT NOW(),
    username            VARCHAR(30) NOT NULL,
    ip_address          INET        NOT NULL,
    port_number         INT         NOT NULL,
    location_city       VARCHAR(30) NOT NULL,
    location_region     VARCHAR(30),
    location_country    CHAR(2),
    resource_name       VARCHAR(20),
    session_id          BIGINT,
    risk_score          INT         NOT NULL,
    watchlist_flag      BOOLEAN     DEFAULT FALSE,
    notes               VARCHAR(200),
    account_status_id   SMALLINT REFERENCES account_status (account_status_id),
    user_role_id        SMALLINT REFERENCES user_role (user_role_id),
    device_type_id      SMALLINT REFERENCES device_type (device_type_id),
    operating_system_id SMALLINT REFERENCES operating_system (operating_system_id),
    browser_name_id     SMALLINT REFERENCES browser_name (browser_name_id),
    event_type_id       SMALLINT REFERENCES event_type (event_type_id),
    event_category_id   SMALLINT REFERENCES event_category (event_category_id),
    action_taken_id     SMALLINT REFERENCES action_taken (action_taken_id),
    status_id           SMALLINT REFERENCES status (status_id),
    severity_id         SMALLINT REFERENCES severity (severity_id),
    resource_type_id    SMALLINT REFERENCES resource_type (resource_type_id),
    failure_reason_id   SMALLINT REFERENCES failure_reason (failure_reason_id)
);