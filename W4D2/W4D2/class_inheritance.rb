class Employee

  attr_reader :salary

  def initialize(name, title, salary, boss)
    @name = name
    @title = title
    @salary = salary
    @boss = boss
  end

  def bonus(multiplier)
    salary * multiplier    
  end
end

class Manager < Employee

  attr_reader :ass_emps
  def initialize(name, title, salary, boss)
    super
    @ass_emps = []
  end

  def bonus(multiplier)
    total_sal = @ass_emps.inject(0) { |accum, emp| accum += emp.salary }
    total_sal * multiplier
  end
end