# Note: Updated all test cases to use the user object.
#  Ex: User: { username?:string, password?:string } }

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "create_account fails with missing username" do
    post api_create_account_path, params: { user: { password: 'validpassword1234567890' } }
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['errors'], "Username can't be blank"
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { user: { username: 'validusername' } }
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['errors'], "Password can't be blank"
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { user: { username: '123456789', password: 'validpassword1234567890' } }
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['errors'], "Username is too short (minimum is 10 characters)"
  end

  test "create_account fails with invalid password" do
    post api_create_account_path, params: { user: { username: 'validusername', password: '1234567890123456789' } }
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['errors'], "Password is too short (minimum is 20 characters)"
    assert_includes JSON.parse(response.body)['errors'], "Password must include at least one letter and one number"
  end

  test "create_account succeeds with valid username and password" do
    post api_create_account_path, params: { user: { username: 'validusername', password: 'validpassword1234567890' } }
    assert_response :created
    assert_equal 'User created successfully', JSON.parse(response.body)['message']
  end
end
