+++
title = 'Reflecting on the need for Abstracting DateTime.Now'
date = 2025-01-24T20:55:21+01:00
draft = false
tags = ["DI", "Testing", "Unit Testing", "Tutorials"]
categories = ["Development Blog"]
+++

## Unit Testing Newbie
When I first started taking unit testing more seriously (it was 13+ years ago, don't fight me!) I didn't understand how to test something when I was using `DateTime.UtcNow`. My tests worked then failed a while later.

I asked, on reflection, an embarrassing question on [Stack Overflow](https://stackoverflow.com/questions/7661953/how-to-write-unit-test-for-time-sensitive-constant). What made it embarrassing was that it showed my lack of understanding of non-deterministic values and testing code that used them. As I mentioned in this case it was usage of `DateTime` in `C#`.

The post now has dead links which is unfortunate as this topic came up again in a conversation I had with a fellow developer recently. So here's a post for reference.

Here's the approach I learnt and took back then and still do today. Hit me up if there is a more modern approach but this is what I've used for years.

## The problem
**You're writing a unit test for a method that calculates a person birthday**

You come up with something simple like the below:

⚠️ _There's a few things wrong with this method as it's intended to only highlight the issue!_
⚠️ _From .NET 6 onwards there is also a new **DateOnly** type which would be more appropriate for representing birth dates. I might write a post about this in the future._

```CSharp
public class AgeCalculator()
{
    public int GetAge(DateTime birthDate)
    {
        DateTime today = DateTime.UtcNow;
        int age = today.Year - birthDate.Year;

        // If the birthday has not occurred yet this year, subtract one from the age
        if (birthDate.Date > today.AddYears(-age))
        {
            age--;
        }

        return age;
    }
}


```
Today is the `24th January 2025` and you're testing that someone born on the `1st February 2000` is 24 years old. This test will pass.

```CSharp
Assert.AreEqual(24, AgeCalculator.GetAge(new DateTime(2000, 2, 1)));
```
but what happens after the 1st February? I'm going to have to adjust my Assertion to 25 and then increment each year?

## The solution
Abstract away the usage of non-deterministic values such as `DateTime.UtcNow`. This is super simple to do.

```CSharp
public interface IDateTimeProvider
{
    // Interface to abstract the current time, making it testable
    public DateTime UtcNow { get; }
}
```

with an implementation of the real `DateTime.UtcNow`:
```CSharp
internal sealed class DateTimeProvider : IDateTimeProvider
{
    // Default implementation that returns the actual current time
    public DateTime UtcNow => DateTime.UtcNow;
}
```
And then where ever you're calling `DateTime.UtcNow` replace with your abstraction.

Like so:
```CSharp
public class AgeCalculator(IDateTimeProvider dateTimeProvider)
{
    public int GetAge(DateTime birthDate)
    {
        DateTime today = dateTimeProvider.UtcNow; // <-- This is now using the provider we created
        int age = today.Year - birthDate.Year;

        // If the birthday has not occurred yet this year, subtract one from the age
        if (birthDate.Date > today.AddYears(-age))
        {
            age--;
        }

        return age;
    }
}
```


Don't forget to register in your DI infrastructure, example if you're using `Microsoft.Extensions.DependencyInjection` framework.

```CSharp
// Register the implementation with your DI container
// This ensures that your application uses the real DateTimeProvider at runtime / in production
services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
```



It's also worth mentioning that this pattern applies to other non-deterministic values too (random numbers, GUIDs, etc.).