-- Easy
-- Find all records where status is failed.
-- Find all records where severity is high or critical.
-- Find all records where account_status is locked.
-- Find all records where watchlist_flag is true.
-- List all login events ordered by event_time.
-- Find the top 10 records with the highest risk_score.
-- Count how many total records exist for each event_type.
--
-- Medium
-- Count how many failed events each username has.
-- Count how many records exist for each ip_address.
-- Count how many high or critical events exist for each username.
-- Count how many failed events exist for each device_type.
-- Count how many suspicious events exist for each location_country.
-- Find the most common failure_reason values.
-- Count how many records exist for each resource_type.
-- Count how many records exist for each user_role and event_category combination.
--
-- Harder
-- Find ip_address values used by more than one username.
-- Find usernames with both failed events and high-risk events.
-- Find session_id values that contain multiple failed events.
-- Find accounts marked locked or suspended that still show successful activity.
-- Find usernames, IP addresses, or sessions where multiple risk indicators appear together (failed status, high severity, watchlist_flag, high risk_score).

--1. sorting the logs for any statuses that show failed. Many things could be investigated, something that sticks out to me is the Mass login attempt and probing API.
--This could bring to light some security concerns that may need to be combated. Mass login attempts for instance may want to be automatically flagged as a problem if it is connected to leaked data of any type.

SELECT *
FROM security_logs l
         JOIN status s ON l.status_id = s.status_id
WHERE s.status_name = 'failed';

--2. Looking into log attempts that are high or critically severe.
--This acts as a triage to allow system administrators to deal with high/critical attempts first before needing to move onto other avenues. This reveals our highest threat concerns first.

SELECT *
FROM security_logs l
         JOIN severity sev ON l.severity_id = sev.severity_id
WHERE sev.severity_name IN ('high', 'critical');

--3. shows locked user accounts
--sometimes a locked user account is not enough to keep out bad actors and knowing where to start to look for specific offenses like brute force can help.

SELECT *
FROM security_logs l
         JOIN account_status a ON l.account_status_id = a.account_status_id
WHERE a.account_status_name = 'locked';

--4. Investigates the current list of flagged user attempts.
--This shows all events created by our flagged clients. This makes it easy to see where high risk moves may be being made.

SELECT *
FROM security_logs WHERE watchlist_flag = TRUE;

--5. Looking at not only the login attempts, but ordering them into chronological order.
--This helps draw a picture of how long someone has been up to something, could identify if it is a bot of some sort or a human bad actor.

SELECT l.*, e.event_type_name
FROM security_logs l
         JOIN event_type e ON l.event_type_id = e.event_type_id
WHERE e.event_type_name = 'login'
ORDER BY l.event_time;

--6. Grabbing my top ten threats
--Gonna go down em and knock em out 1 by 1 like Americas most wanted.

SELECT *
FROM security_logs
ORDER BY security_logs.risk_score DESC
    LIMIT 10;

--7. looking at what people are doing, specifically are they just logging in, accessing files, conducting administrative actions ect.
--This creates some sort of "baseline norm" that will assist in identifying bad actors later on in monitoring operations.

SELECT e.event_type_name, COUNT(*) AS total_events
FROM security_logs l JOIN event_type e ON l.event_type_id = e.event_type_id
GROUP BY e.event_type_name
ORDER BY total_events DESC;

--8. This puts all my event failures into one box that I can compare over time.
--Looking at aggregated data like this can assist in spotting abnormal behavior. If all of a sudden someone that has 0 event failures starts to outperform alex_k in way of failing, there may be something wrong with that users account.

SELECT username, COUNT(*) AS failed_count
FROM security_logs l
         JOIN status s ON l.status_id = s.status_id
WHERE s.status_name = 'failed'
GROUP BY username
ORDER BY failed_count DESC;

--9. quickly sums up how many records exist from each ip_address.
--ip addresses with many records associated with them may be part of something concerning.
-- evaluating these with the timestamps that we did earlier can determine more information as well; Are they all using the same ip from a system, server, or something more?

SELECT ip_address, COUNT(*) AS request_count
FROM security_logs
GROUP BY ip_address
ORDER BY request_count DESC;

--10. listing the users that have a high amount of severe security flags.
--once again building our Americas Most Wanted list.

SELECT username, COUNT(*) AS sever_event_count
FROM security_logs l
         JOIN severity sev ON l.severity_id = sev.severity_id
WHERE sev.severity_name IN ('high','critical')
GROUP BY username
ORDER BY sever_event_count DESC;

--11. Identifying what devices are popular for use in the failed attempts
--This can identify trends of technology use and capabilities of attackers.

SELECT dt.device_type_name, COUNT(*) AS failed_count
FROM security_logs
         JOIN status s on security_logs.status_id = s.status_id
         JOIN device_type dt on security_logs.device_type_id = dt.device_type_id
WHERE s.status_name = 'failed'
GROUP BY dt.device_type_name
ORDER BY failed_count DESC;

--12. Identifying which countries are playing the largest roll in cyberattacks
--Knowing where the attacks are coming from is a great way to identifying or relating what other attacks are possible from the same entity.

SELECT location_country, COUNT(*) AS suspicious_count
FROM security_logs
WHERE risk_score > 50 OR watchlist_flag=TRUE
GROUP BY location_country
ORDER BY suspicious_count DESC;

--13. Identifying the frequency oif each of the failure reasons
--This can identify what exactly is happening to log so many failed attempts. This shows that a majority of people are just forgetting thier password.

SELECT f.failure_reason_name, COUNT(*) AS frequency
FROM security_logs l
         JOIN failure_reason f ON l.failure_reason_id = f.failure_reason_id
GROUP BY f.failure_reason_name
ORDER BY frequency DESC;

--14. Shows the volume of requests that are targeting each resource types
--This can show if any admin permissions are being accessed improperly which could quickly identify data breaches.

SELECT r.resource_type_name, COUNT(*) AS access_count
FROM security_logs l
         JOIN resource_type r ON l.resource_type_id = r.resource_type_id
GROUP BY r.resource_type_name
ORDER BY access_count DESC;

--15. Displays another baseline of user privileges and event category numbers
--Baselines like this are important to identify what the norm is in case there is a change to that norm.

SELECT u.user_role_name, c.event_category_name, COUNT(*) AS event_count
FROM security_logs l
         JOIN user_role u ON l.user_role_id=u.user_role_id
         JOIN event_category c on l.event_category_id = c.event_category_id
GROUP BY u.user_role_name, c.event_category_name
ORDER BY u.user_role_name, event_count DESC;

--16. This looks for those users that have sharing ip_addresses. This makes it easy to Identify who is utilizing alternate accounts.
--In this sense, these are strong indicators of (something's fishy here)

SELECT ip_address, COUNT(DISTINCT username) AS unique_users
FROM security_logs
GROUP BY ip_address
HAVING COUNT(DISTINCT username) > 1;

--17. Boiling down the data to who has both had a failed event and also has high-risk events.
-- This shows users with multiple flagged risk factors. These people are naughty naughty.

SELECT username
FROM security_logs l
         JOIN status s ON l.status_id = s.status_id
WHERE s.status_name = 'failed'
GROUP BY username;

--18. This singles out those session ID's that fail multiple times.
--This is important to identify how many loops things are going thru before either getting in, or giving up. If this correlated with some of our other tables correctly, that would make even more flags to find attackers.

SELECT session_id, COUNT(*) AS failed_session_events
FROM security_logs l
         JOIN status s ON l.status_id = s.status_id
WHERE s.status_name = 'failed' AND session_id IS NOT NULL
GROUP BY session_id
HAVING COUNT(*) >1;

--19. This highlights some flaws in the system where even through a failed attempt somebody can still utilize actions on the user account.
-- This can really highlight some issues with security measures if a user can still get in even without an active account.

SELECT l.log_id, l.username, a.account_status_name, s.status_name, l.event_time
FROM security_logs l
         JOIN account_status a ON l.account_status_id = a.account_status_id
         JOIN status s ON l.status_id=s.status_id
WHERE a.account_status_name IN ('locked', 'suspended')
  AND s.status_name = 'success';

--20. This will do what I would call an autoban list.
--this list can help by turning this table into an auto lock or prohibited user list and also blocking the IP and any associated IPs with these. This will hopefully spiderweb into the world of scammers.

SELECT l.log_id, l.event_time, l.username, l.ip_address, l.session_id, l.risk_score, sev.severity_name, s.status_name, l.watchlist_flag
FROM security_logs l
         JOIN status s ON l.status_id = s.status_id
         JOIN severity sev ON l.severity_id = sev.severity_id
WHERE s.status_name = 'failed'
  AND sev.severity_name IN ('high', 'critical')
  AND (l.watchlist_flag = TRUE OR l.risk_score >= 75);
