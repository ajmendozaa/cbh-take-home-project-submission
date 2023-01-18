# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket #1

I will assume that each of Agents, Shifts, and Facilities table have their own class with their own variables. The first thing I would do is since we want to have a custom ID for Agents in the Facilities table is to add a custom_agent_id field in the Facilities class and and a custom_facilities_id in the Agents class in order for us to keep track on what ID is assigned to the Agent in the Facilities table. This is a very simple task, it would require minimal time/effort to develop and it could be done in approximately a day since we also have to do some testing to make sure the addition of these fields did not break anything elsewhere.

Ticket #2

Now that we have both fields on both classes, we can go ahead and change up the schema of the database in order to include both of these fields in them. We would need to have a reference from the Facilities table to the Agents table since the Agents table would have a foreing_key which will be the custom_agent_id that comes from the Facilities table. This would take some more time to develop since we are directly manipulating the database schema and we would have to be extremely careful on not to run into some errors because of what we just added. Just to be very careful with this since it is data we are talking about, I would suggest 1-2 days to develop this in order for us to write new tests, run existing tests, and make sure that everything else is staying consistent with what we already have.

Ticket #3

Once we have both the fields in the classes and on the database, now we need to generate these new IDs for Agents in the Facilities table. This step can be done however we want in the sense that since it will be a custom ID it doesn't really have to match anything else we have. Having said that, we can generate the ID on our own or using a third-party software. Once we do this, we need to import that data to the Facilities and Agents table making sure that each custom ID matches on both tables. Since this process can take some time and the process of verifying everything is matches on both tables can be long and tedious, I would suggest that this takes up approximately 3 days to double and triple check that the data is 100% correct and matching.

Ticket #4

We now have both tables synchronized and we now need to use the newly created custom IDs when saving shifts to the Shifts table. I will also assume that we already have a function that takes all the data and saves it to the Shifts table. We then have to update that function in order for it to use the Facilities custom_agent_id instead of the id from the Agents table. Once we do that we need to make sure that the correct id is being passed and saved. This process can also take some time since we need to update both the function and existing tests to match the new ID that is being used. For this step I would suggest 2-3 days as well in order to make sure that the function is being refactored properly, the IDs are being saved properly on the tables and for the data to be checked once it is on the Shifts table.

Ticket #5

We now have everything we need to store the newly created ID to the corresponding table. We now need to be able to get the correct data from the Facilities table using the custom_agent_id. We can now simply have the getShiftsFromFacility be able to get the shifts from their Agents using the custom_agent_id from the Facilities table. This is a very simple step since we only need to refactor what variable we use to call that function. This should be taking about 1 day to develop and test to make sure that the shifts from each agent are all accounted for. Also good to note that we need to refactor some of the existing tests to use the new ID and make sure they don't break or give us any errors or warnings.