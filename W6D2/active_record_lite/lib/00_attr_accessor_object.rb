class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |ivars|
      define_method(ivars) do
        instance_variable_get("@#{ivars}")
      end
    
      define_method("#{ivars}=") do |val|
        instance_variable_set("@#{ivars}", val)
      end
    end
  end
end