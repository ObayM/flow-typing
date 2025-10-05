Goal: Make a great writing experience that will make you type for longer periods

Features: 
- Sleak Interface {DONE}
- Minamilist Design [DONE]

TODO:
- Timer for how long you've been typing and when you stop for 10 seconds, it will reset to 0 [DONE]
- A mode where if you stopped for 10 seconds everything will be erased so you force yourself to write for a certain period of time
- ^^ I will call it (Write Or die)
- This mode will be activated once he clicks the button in the header (default will be 10 minutes)
- he can change the minutes in the settings i think
(Write or die mode have been done)

Next is the visual effects and code cleaning and organizing, it's pretty messy here 


-- oh no i've been playing with styles for 10m , next is i think a progress bar for the time remaining in the WriteOrDie mode

okay the progress bar is working completely fine but the code is REALLY really a big mess so i need to do some cleaning tho

okay now let's see i'll be doing something like a landing page , explaining the website and the idea behind it 

it's working great now but need lots and lots of edits but it's not buggy at least

---
I tried to use tailwindcss theme but it really sucks i don't know why but i feel it's not great for me

right now i am about to finish the landing page
i am tirrble in  choosing colors but i hope that everything works

it's pretty much done

okay now i'll be working on converting all of this js to ts and i'll try to move and organize things as i think it's pretty bad here

i think i got a cool feature which is saving the text to local storage , also i need to setup supabase too so i can save to it the config for like write or die and the other defaults i think that would be perfect

okay here i will write the db schema for supabase
so i need a config table
which it's job to manage all of the constants like localstorage key but why i will need to change this i think i'll keep it out

anyway we will need to save
- time before deleting the text in the WriteOrDie mode 
- time for the writeordie mode itself like how long

so okay that won't be a column it would be just config_id, config_key, config_value

create table configs (
  config_id uuid primary key default gen_random_uuid(),
  config_key text unique not null,
  config_value jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

finally the writeOrDie mode is working perfectly fine and everything si going great and added suapbase 

okay awesome, i think i'll be doing something like creating the settings Modal and it would only works if you logged in ,so i'll try to 
actually do the auth and also the settings modal and save it to local storage ig but just let's get it done