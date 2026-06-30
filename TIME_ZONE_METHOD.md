# Time-zone calculation method

WorldTime Grid stores IANA identifiers such as `Asia/Seoul` and `America/New_York`, not only values such as UTC+9 or UTC-5. A UTC offset is the result of applying a region's rule to one date; it is not a complete time zone.

For a selected local date, Luxon uses the browser/JavaScript internationalization data to create the local value and convert it to UTC. Every city row then renders that same UTC instant in its own zone. Recommendation candidates are generated at 15-, 30- or 60-minute intervals and evaluated against local weekdays, working intervals, lunch, preferred windows and avoid windows. Overnight intervals are represented as clock ranges that cross midnight.

DST warnings compare offsets during the selected local day, while the checker scans a year for date-to-date offset changes. Browser and operating-system releases can contain different IANA database versions. Governments can also change rules after software ships. Historic timestamps and distant-future events therefore require additional verification.

Recurring meetings need special care. Decide which location owns the wall-clock time, calculate each occurrence, inspect transition periods and communicate complete local dates. The fairness label is a transparent heuristic, not a scientific claim.
