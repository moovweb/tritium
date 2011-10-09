require 'minitest/autorun'
require "tritium"

class ParseTreeTests < MiniTest::Unit::TestCase
  TEST_DIR = File.dirname(__FILE__)
  test_folder = File.join(TEST_DIR, "*")
  Dir[test_folder].each do |input_file_name|
    next if !File.directory?(input_file_name)
    test_name = File.basename(input_file_name)
    next if test_name == "tmp"
    eval "def test_#{test_name}; parse_tree_test '#{test_name}'; end"
  end

  def make_testbed(input_dir)
    tmp_dir = File.join(TEST_DIR, "tmp")
    if Dir.exists?(tmp_dir)
      FileUtils.rm_rf(tmp_dir)
    end
    Dir.mkdir(tmp_dir)
    FileUtils.cp_r(File.join(input_dir, "input", "."), tmp_dir)
    `sync`
  end

  def dirty_testbed(input_dir)
    tmp_dir = File.join(TEST_DIR, "tmp")
    FileUtils.cp_r(File.join(input_dir, "changes", "."), tmp_dir)
    `sync`
  end

  def run_tritium
    script_file = File.join(TEST_DIR, "tmp", "main.ts")
    tritium = Tritium::Engines::Standard.new(File.read(script_file), 
                                      :filename => "script.ts",
                                      :script_name => "main.ts",
                                      :path => File.join(TEST_DIR, "tmp"))
    tritium.to_script
  end

  def parse_tree_test(test_name)
    input_dir = File.join(TEST_DIR, test_name)
    expected_before = File.read(File.join(input_dir, "output", "before.ts"))
    expected_after = File.read(File.join(input_dir, "output", "after.ts"))
    # Setup before case
    make_testbed input_dir
    script_before = run_tritium
    # Check result
    assert_equal expected_before, script_before, "Before check failed"
    # Setup after case
    dirty_testbed input_dir
    script_after = run_tritium
    # Check result
    assert_equal expected_after, script_after, "After check failed"
  end
end

